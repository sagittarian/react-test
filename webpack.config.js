var path = require("path");
var npmPath = path.join(__dirname, "node_modules");
console.log(npmPath);

module.exports = {
    entry: "./app/reactsb.jsx",
    output: {
        filename: "./dist/bundle.js"
    },
	module: {
		loaders: [
			{ test: /\.jsx$/, loader: "jsx-loader" }
		],
		resolveLoader: {
			root: npmPath
		}
	}
};
