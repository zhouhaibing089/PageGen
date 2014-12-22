define(["./core", "./td"], function(require, exports, module) {

    var tg = require("./core");
    var td = require("./td");

    tg.registerHandler("text", td.text);
    tg.registerHandler("image", td.image);
    tg.registerHandler("date", td.date);

    tg.setEvents = function(events) {
        td.setEvents(events);
    };

    return tg;
});
