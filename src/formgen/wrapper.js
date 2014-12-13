define(['../lib/jquery', '../lib/handlebars'], function(require, exports, module) {

    var $ = require("../lib/jquery");
    var Handlebars = require('../lib/handlebars');

    // alias
    var doc = document;

    /**
     * the common wrapper
     *  <div class="formgen">
     *      <label class="formgen_label">{{label}}</label>
     *      <div class="formgen_inputs">
     *          {{inputs}}
     *          <!-- only used when config.required === true -->
     *          <span class="formgen_star">*</span>
     *          <span class="formgen_tip">{{tip}}</span>
     *          <p class="formgen_msg"></p>
     *      </div>
     *  </div>
     */
    exports.common = function(ele, config, callback) {
        var defaultConfig = {
            msg: true
        };

        config = $.extend(defaultConfig, config);

        var mainDiv = doc.createElement("div");
        var fieldDiv = doc.createElement("div");

        $(fieldDiv).addClass("formgen_inputs").append(ele);

        if (config.star === true) {
            $(fieldDiv).append($("<span>").addClass("formgen_star").text("*"));
        }

        if (config.tip) {
            $(fieldDiv).append($("<span>").addClass("formgen_tip")
                .text(config.tip));
        }

        if (config.label !== undefined) {
            var label = doc.createElement("label");
            $(mainDiv).append($(label).addClass("formgen_label").text(config.label));
        }

        if (config.msg === true) {
            var p = doc.createElement("p");
            $(fieldDiv).append($(p).addClass("formgen_msg"));
            // assign a new fg_msg function
            ele.fg_msg = function() {
                if (arguments.length > 0) {
                    $(p).text(arguments[0]);
                }
                return $(p).text();
            };
        }

        $(mainDiv).addClass("formgen clearfix").append(fieldDiv);

        if (callback === undefined) {
            return mainDiv;
        } else {
            callback(mainDiv);
        }
    };

    /*
     * the html wrapper, you write the html, and use templates to wrap the
     * generated field
     *
     */
    exports.html = function(field, config, callback) {
        var defaultConfig = {
            msg: true
        };

        config = $.extend(defaultConfig, config);

        if (callback === undefined) {
            callback = new Function();
        }

        var path = config.wrapperPath;

        $.ajax({
            url: path,
            type: "GET",
            success: function(source) {
                // compile the template and put the field
                source = source.replace(/{{{field}}}/g,
                    "<div id='J_wrapper_tmp'></div>");
                var template = Handlebars.compile(source);
                var result = $(template(config));
                result.find("#J_wrapper_tmp").append(field);
                // unwrap it
                $(field).unwrap();
                // set fg_msg function
                field.fg_msg = function() {
                    if (arguments.length > 0) {
                        result.find(".formgen_msg").text(arguments[0]);
                    }
                    return result.find(".formgen_msg").text();
                };
                if (callback !== undefined) {
                    callback(result);
                }
            },
            fail: function() {
                callback(false);
            }
        });
    }
});
