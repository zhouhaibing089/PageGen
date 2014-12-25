define(["./core", "./ele"], function(require, exports, module) {

    var pg = require("./core");
    var ele = require("./ele");

    pg.registerHandler("form", ele.form);
    pg.registerHandler("table", ele.table);
    pg.registerHandler("css", ele.css);
    pg.registerHandler("js", ele.js);
    pg.registerHandler("html", ele.html);

    var events = {};

    pg.setEvents = function(evts) {
        events = evts;
        ele.setEvents(evts);
    };

    pg.getEvents = function() {
        return events;
    };

    pg.addExt = function(extension) {
        for (var type in extension.pg) {
            pg.registerHandler(type, extension.pg.type);
        }
        ele.addExt(extension);
    };

    return pg;
});
