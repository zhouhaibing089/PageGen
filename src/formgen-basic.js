define(['formgen-core'], function(require, exports, module) {
    // the formgen-core module
    var FG = require('formgen-core');
    // the alias of document
    var doc = document;

    FG.registerHandler("hidden", hidden);
    FG.registerHandler("text", hidden);

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

    return FG;
});
