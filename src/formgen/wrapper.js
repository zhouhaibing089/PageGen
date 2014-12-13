define(['../lib/handlebars'], function(require, exports, module) {
    var handlebars = require('../lib/handlebars');

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
    exports.common = function(ele, config) {
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
            // delete the original fg_msg function
            delete ele.fg_msg;
            // assign a new fg_msg function
            ele.fg_msg = function() {
                if (arguments.length > 0) {
                    $(p).text(arguments[0]);
                }
                return $(p).text();
            };
        }

        return $(mainDiv).addClass("formgen clearfix").append(fieldDiv);
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
        var msgClass = config.wrapperMsgClass;
        $.ajax({
            url: path,
            type: "GET",
            success: function(html) {
                var fieldHtml = $(field)[0].outerHTML;
                var data = {
                    star: config.star,
                    msg: config.msg,
                    field: fieldHtml
                }
            },
            fail: function() {
                callback(false);
            }
        })
    }
});
