define(["./core", "./ele"], function(require, exports, module) {

    var PG = require("./core");
    var Ele = require("./ele");

    PG.registerHandler("form", Ele.form);
    PG.registerHandler("table", Ele.table);

    return PG;
});
