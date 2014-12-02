/**
 * Created by zhb on 12/02/2014
 */
define(['jquery', 'util'], function(require, exports, module) {

	// module variable
	/* extension point */
	var handlers = {
		"hidden": hidden,
		"text": text,
		"textarea": textarea,
		"select": select,
		"checkbox": checkbox
	};


	// FG variable 
	var FG = function(config, value) {
		var args = arguments;
		this.config = args.length > 0 ? args[0] : {};
		this.value = args.length > 1 ? args[1] : {};
	};

	/* init a new instance of FormGenerator */
	FG.init = function() {
		return new FG(arguments);
	};

	/* register a new handler for given type */
	FG.registerHandler = function(type, handler) {
		handlers[type] = handler;
	};


	// FGP variable
	var FGP = FG.prototype;

	/**
	 * the first argument is the parent element where the generated form
	 * will be inserted into.
	 */
	FGP.build = function(p) {
		if (!(p instanceof jQuery)) {
			p = $(p);
		}
		var form = $("<form>");
		/* insert into dom */
		p.append(form);
		/* add form attributes */
		form.attr("id", config.formId);
		form.addClass(config.formClass);
		form.attr("method", config.method);
		form.attr("action", config.action);
	};

	/**
	 * check the data integrity
	 */
	FGP.check = function(callback) {

	};


	/**
	 * get the data in form
	 */
	FGP.data = function(callback) {

	}


	FGP.submit = function(callback, param) {
		var data = $.extend(data(), param);

	}

	function hidden(cfg, val) {

	}

	function text(cfg, val) {

	}

	function textarea(cfg, val) {

	}

	function select(cfg, val) {

	}

	function checkbox(cfg, val) {

	}



	return FG;
});