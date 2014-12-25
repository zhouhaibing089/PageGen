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
            name: "zhb",
            photo: "a"
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
        this.table = table;
        table._tg = this;
        $(table).attr("id", self.config.id).addClass(self.config["class"]);
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
            self.append(value);
        });
        // everything is done
        callback(table);
    };

    // append one more row
    TGP.append = function(value) {
        var self = this;
        // create the tr
        var tr = doc.createElement("tr");
        // save the value as an attribute in tr
        tr._tgValue = JSON.stringify(value);
        // build every field
        self.config.headers.forEach(function(header) {
            // the name
            var name = header.name;
            // the handler
            var handler = handlers[header.type];
            if (handler) {
                // build it
                handler(header, value._getValue(name), function(td) {
                    $(tr).append($(td).attr("name", name ?
                    name.replace(/\./g, "_") : ""));
                });
            } else {
                // use the raw text
                var td = doc.createElement("td");
                $(tr).append($(td).append(value._getValue(name)));
            }
        });
        // append it
        $(self.table).find("tbody").append(tr);
    };

    // remove the given indexed row
    TGP.remove = function(index) {
        var self = this;
        var tr = $(self.table).find("tbody tr")[index];
        $(tr).remove();
    };

    TGP.clear = function() {
        $(this.table).find("tbody").empty();
    };

    return TG;
});
