define(function(require, exports, module) {

    /*
     * retrieve the arguments in url
     */
    exports.getParameters = function() {
        var search = window.location.search;
        if (!search) {
            return {};
        }
        var data = {};
        search = search.substr(1);
        var kvList = search.split("&");
        kvList.forEach(function(kv) {
            kv = kv.split("=");
            data[kv[0]] = kv[1];
        });
        data.path = window.location.pathname;
        return data;
    };

});
