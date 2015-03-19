var React = require("react");
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('flux').Dispatcher;
var dispatcher = new Dispatcher;

var createStore = function (config) {
    var store = new EventEmitter;
    for (var prop in config) {
        store[prop] = config[prop];
    }
    'init' in store && store.init();
    if (!store.state) {
        store.state = {};
    }
    store.dispatchToken = dispatcher.register(store.callback.bind(store));
    return store;
};

var TimeKeeperStore = createStore({
    callback: function (payload) {
        if (payload.action === 'show-time') {
            this.state.time = (new Date).toString();
        }
        this.emit('change');
    },
    getState: function () {
        return this.state;
    }
});


var MyWidget = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentWillMount: function () {
        TimeKeeperStore.on('change', this.change);
    },
    click: function (event) {
        dispatcher.dispatch({
            action: 'show-time'
        })
    },
    change: function (event) {
        this.setState(TimeKeeperStore.getState());
    },
	render: function () {
		return (
            <div>
              <button type="button" onClick={this.click}>Now</button>
              <input type="text" disabled="disabled"
                     value={this.state.time} />
            </div>
        );
	}
});

React.render(<MyWidget />, document.querySelector('.view-port'));
