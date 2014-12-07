/**
 * Created by zhb on 12/7/14.
 */
define(['formgen/core', 'formgen/field', 'formgen/wrapper'], function(require, exports, module) {

    var FG = require('formgen/core');
    var FIELD = require('formgen/field');
    var WRAPPER = require('formgen/wrapper');

    FG.registerHandler("text", FIELD.text);
    FG.registerHandler("textarea", FIELD.text);
    FG.registerHandler("hidden", FIELD.text);
    FG.registerHandler("select", FIELD.select);

    FG.registerWrapper("common", WRAPPER.common);

    return FG;
});