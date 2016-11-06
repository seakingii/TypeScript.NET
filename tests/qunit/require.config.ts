///<reference types="qunit"/>

//noinspection SpellCheckingInspection
(<any>requirejs).config({

	baseUrl: './',
	urlArgs: 't=' + (new Date()).getTime(),

	paths: {
		"QUnit": "./qunit"
	},

	shim: {
		'QUnit': {
			//deps: [
			//	'css!bower_components/qunit/qunit/qunit'
			//],
			exports: 'QUnit',
			init: function()
			{
				//QUnit.config.autoload = false;
				QUnit.config.autostart = false;
			}
		}
	}
});

