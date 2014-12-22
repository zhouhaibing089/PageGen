/*
 * Created by zhb on 12/18/2014
 */
define(["../lib/jquery"], function(require, exports, module) {
    // jquery library
    var $ = require("../lib/jquery");
    // td handlers
    var handlers = {};
    // alias of document
    var doc = document;

    // constructor
    var TG = function(config, value) {
        this.config = config ? config : {};
        this.value = value ? value : [{
            name: "hello",
            photo: "www.baidu.com"
        }];
    };

    // register a new td handler
    TG.registerHandler = function(type, handler) {
        handlers[type] = handler;
    };

    // the prototype of TG
    var TGP = TG.prototype;

    // build the table[Notice: **There is no asynchronous problem..**]
    TGP.build = function(table, callback) {
        var self = this;

        if (typeof(table) === "function") {
            callback = table;
            table = null;
        }
        if (!table) {
            table = doc.createElement("table");
        }
        // assign the table generator as an attribute
        table._tg = this;
        if (!callback) {
            callback = function() {};
        }
        // build head
        var thead = doc.createElement("thead");
        var tr = doc.createElement("tr");
        self.config.headers.forEach(function(header) {
            var th = doc.createElement("th");
            $(tr).append($(th).text(header.text));
        });
        $(table).append($(thead).append(tr));
        // build body
        var tbody = doc.createElement("tbody");
        $(table).append(tbody);
        // add row
        self.value.forEach(function(value) {
            var tr = doc.createElement("tr");
            // save the value as an attribute in tr
            tr._tgValue = JSON.stringify(value);
            // build every field
            self.config.headers.forEach(function(header) {
                var handler = handlers[header.type];
                if (handler) {
                    handler(header, value.get(header.name), function(td) {
                        $(tr).append($(td).attr("name", header.name
                            .replace(/\./g, "_")));
                    });
                } else {
                    var td = doc.createElement("td");
                    $(tr).append($(td).append(value.get(header.name)));
                }
            });
            $(tbody).append(tr);
        });
        // everything is done
        callback(table);
    };

    return TG;
});
