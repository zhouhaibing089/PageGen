define(function(require, exports, module) {

    var App = function() {};

    App.prototype.init = function() {
        console.log("Application Initialized..");
    };

    return new App();
});
