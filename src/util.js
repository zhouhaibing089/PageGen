define(function(require, exports, module) {

    /**
     * Object.prototype.get
     */
    if (({}.get) === undefined) {
        
        Object.prototype.get = function(path) {
            var obj;
            
            if (this instanceof String) {
                try {
                    obj = JSON.parse(this);
                } catch(x) {
                    return null;
                }
            } else {
                obj = this;
            }

            if (path === "") {
                return null;
            }

            var index = path.indexOf(".");

            if (index === -1) {
                return obj[path];
            }

            var name = path.substr(0, index);
            path = path.substr(index + 1);

            return obj[name].get(path);
        }
    }

    /*
     * Array.prototype.indexOf
     */
    if (!Array.prototype.indexOf) {
        
        Array.prototype.indexOf = function(elt/*, from*/) {
            
            var len = this.length >>> 0;
            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            
            if (from < 0) {
                from += len;
            }

            for (; from < len; from++) {
                if (from in this && this[from] === elt) {
                    return from;
                }
            }

            return -1;
        };
    }

    /*
     * Array.isArray
     */
    if (!Array.isArray) {
        Array.isArray = function(obj) {
            return typeof obj === 'object' && Object.prototype.toString.call(obj) 
                === '[object Array]';
        }
    }

    /*
     * Date.prototype.format
     */
    if (!Date.prototype.format) {
        Date.prototype.format = function (fmt) { 
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(), 
                "h+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
            };
            
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
                    .substr(4 - RegExp.$1.length));
            }

            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) 
                        : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }

            return fmt;
        }
    }
});
