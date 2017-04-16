/*!
 * jQuery SubMenu Plugin v0.0.1
 * https://github.com/Shopeca/sub-menu
 *
 * Copyright 2017 Tom Hnatovsky
 * Released under the MIT license
 */
(function ($) {
	$.fn.subMenu = function (options) {
		var settings = $.extend({
			topCorrection: 10,
			openedClass: 'sub-menu-opened',
			optionDataAttribute: 'options'
		}, options);

		var menus = [];

		var calculateListPosition = function (el, list) {
			var coordinates = el.offset();
			var width = list.outerWidth();
			list.css({
				top: (coordinates.top + el.outerHeight() + settings.topCorrection),
				left: (coordinates.left + Math.round(el.outerWidth() / 2) - Math.round(width / 2))
			});
		};

		var performToggle = function (e, index) {
			e.preventDefault();
			var item = menus[index];
			if (item.opened) {
				item.list.hide();
				item.opened = false;
				item.element.removeClass(settings.openedClass);
			} else {
				item.list.show();
				item.opened = true;
				item.element.addClass(settings.openedClass);
			}
		};

		var i = 0;
		this.each(function(){
			var list = null;
			var element = $(this);
			var opened = false;

			var listSelector = element.data(settings.optionDataAttribute);
			if (listSelector !== null) {
				list = $(listSelector).eq(0);
				if (list !== null) {
					list.hide();
					calculateListPosition(element, list);

					element.data('index', i);
					i++;
					menus.push({
						element: element,
						list: list,
						listSelector: listSelector,
						opened: false
					});

				}
			}
		});

		if (menus.length > 0) {
			for (var i = 0; i < menus.length; i++) {
				var item = menus[i];
				item.element.on('click', function (e) {
					performToggle(e, $(this).data('index'));
				});
			}
			window.addEventListener('resize', function () {
				for (var i = 0; i < menus.length; i++) {
					calculateListPosition(menus[i].element, menus[i].list);
				}
			});
			document.addEventListener('click', function (e) {
				for (var i = 0; i < menus.length; i++) {
					if (menus[i].opened) {
						if (e.target !== menus[i].element[0]) {
							var el = $(e.target);
							if (el.closest(menus[i].listSelector).length == 0) {
								performToggle(e, i);
							}
						}
					}
				}
			});
		}

		return this;
	};

}(jQuery));