define(["./core", "./ele"], function(require, exports, module) {

    var pg = require("./core");
    var ele = require("./ele");

    pg.registerHandler("form", ele.form);
    pg.registerHandler("table", ele.table);
    pg.registerHandler("css", ele.css);
    pg.registerHandler("html", ele.html);

    pg.setEvents = function(events) {
        ele.setEvents(events);
    };

    pg.addExt = function(extension) {
        for (var type in extension.pg) {
            pg.registerHandler(type, extension.pg.type);
        }
        ele.addExt(extension);
    };

    return pg;
});
