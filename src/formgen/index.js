/**
 * Created by zhb on 12/7/14.
 */
define(['./core', './field', './wrapper'], function(require, exports, module) {

    var fg = require('formgen/core');
    var field = require('formgen/field');
    var wrapper = require('formgen/wrapper');

    fg.registerHandler("text", field.text);
    fg.registerHandler("textarea", field.text);
    fg.registerHandler("hidden", field.text);
    fg.registerHandler("select", field.select);
    fg.registerHandler("checkbox", field.checkbox);

    fg.registerWrapper("common", wrapper.common);

    return fg;
});
