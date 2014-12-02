define(function(require, exports, module) {

	/**
	 * the getValue mehtod
	 */
	if (({}.getValue) === undefined) {
		
		Object.prototype.getValue = function(path) {
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

			return obj[name].getValue(path);
		}
	}

	return {};

});