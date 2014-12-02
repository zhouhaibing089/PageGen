define(['formgen-core'], function(require, exports, module) {
    // the formgen-core module
    var FG = require('formgen-core');
    // the alias of document
    var doc = document;

    // register handler
    FG.registerHandler("hidden", hidden);
    FG.registerHandler("text", hidden);

    // register wrapper
    FG.registerWrapper("general", generalWrapper);

    // just add attribute the disabled property to be true
    var disabledFrozen = function() {
        this.attr("disabled", true);
    };

    // get hidden input
    function hidden(cfg, val, callback) {
        var ret = $(doc.createElement("input"));
        // set the frozen function
        ret.frozen = disabledFrozen;
        // set the attributes
        FG.attr(ret, cfg);
        // set value
        FG.val(ret, val, cfg.frozen);
        // return
        callback(ret, cfg);
    }

    /**
     * the general wrapper
     *  <div class="formgen">
     *      <div class="formgen_label">{{label}}</div>
     *      <div class="formgen_inputs">{{inputs}}</div>
     *  </div>
     */
    function generalWrapper(ele, config) {
        var div = $(doc.createElement("div")).addClass("formgen clearfix");
        var inputsDiv = $(doc.createElement("div")).addClass("formgen_inputs").append(ele);

        if (config.label != undefined) {
            div.append($(doc.createElement("div")).addClass("formgen_label").append(
                $(doc.createElement("label")).append(config.label)));
        } else {
            inputsDiv.removeClass("formgen_inputs").addClass("formgen_inputs_nolabel");
        }

        return div.append(inputsDiv);
    }

    return FG;
});
