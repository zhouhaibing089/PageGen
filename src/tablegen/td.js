define(["../lib/jquery"], function(require, exports, module) {

    var $ = require("../lib/jquery");

    var doc = document;

    var events = {};

    exports.setEvents = function(evts) {
        for (var m in evts) {
            events[m] = evts[m];
        }
    };

    // the text td
    exports.text = function(config, value, callback) {
        var td = doc.createElement("td");

        $(td).text(value);

        if (callback) {
            callback(td);
        } else {
            return td;
        }
    };

    // the image td
    exports.image = function(config, value, callback) {
        var td = doc.createElement("td");

        var img = $("<img>").attr("src", value);

        if (config && config.link) {
            var a = doc.createElement("a");
            $(td).append($(a).attr("target", "_blank").append($(img)));
        } else {
            $(td).append($(img));
        }

        if (callback) {
            callback(td);
        } else {
            return td;
        }
    };

    // the date td
    exports.date = function(config, value, callback) {
        value = new Date(value).format(config.dateFmt);
        // delegate to the text td
        exports.text(config, value, callback);
    };

    // for event test, the button
    exports.button = function(config, value, callback) {
        var td = doc.createElement("td");
        var button = doc.createElement("button");
        button.type = "button";
        $(button).attr("id", config.id).addClass(config["class"])
            .text(config.text);
        if (config.onclick) {
            $(button).click(function() {
                var event = events[config.onclick];
                if (event) {
                    event(value);
                }
            });
        }
        $(td).append(button);

        if (callback) {
            callback(td);
        } else {
            return td;
        }
    };
});
