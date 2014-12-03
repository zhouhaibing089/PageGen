define(['formgen/core'], function(require, exports, module) {
    var FG = require('formgen/core');
    // alias
    var doc = document;
    
    // register wrapper
    FG.registerWrapper("general", generalWrapper);

    /**
     * the general wrapper
     *  <div class="formgen">
     *      <div class="formgen_label">{{label}}</div>
     *      <div class="formgen_inputs">
     *          {{inputs}}
     *          <p class="formgen_msg"></p>
     *      </div>
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

        if (config.msg === undefined) {
            config.msg = true;
        }

        inputsDiv.append($(doc.createElement("p")).addClass("formgen_msg"));

        return div.append(inputsDiv);
    }
});