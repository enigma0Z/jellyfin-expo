/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
module.exports = function(api) {
	api.cache(true);
	return {
		presets: [ 'babel-preset-expo' ],
		plugins: [ 
			'react-native-reanimated/plugin', 
			["@babel/plugin-proposal-decorators", { "version": "legacy" }],
			[ '@babel/plugin-transform-private-methods', {loose: true} ]
		]
	};
};
