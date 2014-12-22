define(["./core", "./ele"], function(require, exports, module) {

    var pg = require("./core");
    var ele = require("./ele");

    pg.registerHandler("form", ele.form);
    pg.registerHandler("table", ele.table);

    pg.setEvents = function(events) {
        ele.setEvents(events);
    };

    return pg;
});
