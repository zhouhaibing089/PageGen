/**
 * Created by zhb on 12/7/14.
 */
define(['./core', './field', './wrapper'], function(require, exports, module) {

    var fg = require('./core');
    var field = require('./field');
    var wrapper = require('./wrapper');

    fg.registerHandler("text", field.text);
    fg.registerHandler("textarea", field.text);
    fg.registerHandler("hidden", field.text);
    fg.registerHandler("select", field.select);
    fg.registerHandler("checkbox", field.checkbox);

    fg.registerWrapper("common", wrapper.common);
    fg.registerWrapper("html", wrapper.html);

    return fg;
});
