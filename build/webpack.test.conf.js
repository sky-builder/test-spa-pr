'use strict'
// This is the webpack config used for unit tests.

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const path = require('path')

const webpackConfig = merge(baseWebpackConfig, {
	// use inline sourcemap for karma-sourcemap-loader
	module: {
		rules: utils.styleLoaders()
	},
	devtool: '#inline-source-map',
	resolve: {
		alias: Object.assign({}, baseWebpackConfig.resolve.alias, {
			unit: path.resolve('.', 'test/unit')
		})
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': require('../config/test.env')
		})
	]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
