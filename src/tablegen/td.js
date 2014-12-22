define(["../lib/jquery", "event"], function(require, exports, module) {

    var $ = require("../lib/jquery");
    var Event = require("event");

    var doc = document;

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

        if (config.link) {
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
});
