define(['formgen-core'], function(require, exports, module) {
	// the formgen-core module
	var FG = require('formgen-core');
	// the alias of document
	var doc = document;

	FG.registerHandler("hidden", hidden);
	FG.registerHandler("text", text);

	function hidden(cfg, val, callback) {
        var input = $(doc.createElement("input"));
        FG.attr(input, cfg);
        input.attr("type", "hidden");
        FG.val(input, val, cfg.frozen);
        callback(input);
    }

    function text(cfg, val, callback) {
        var input = $(doc.createElement("input"));
        FG.attr(input, cfg);
        input.attr("type", "text");
        FG.val(input, val, cfg.frozen);
        callback(input);
    }

    return FG;
});