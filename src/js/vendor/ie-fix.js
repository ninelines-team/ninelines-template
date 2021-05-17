/* eslint-disable */

/**
* Много разных фиксов для ie,
* чтобы не было лишних проблем
* Performance.now()
* forEach
* CustomEvent
* includes
* matches
* closest
* prepend
* append
* before
* remove
* startsWith
* Performance.now()
* https://gist.github.com/paulirish/5438650
*/

const ieFix = () => {
	(function () {
		if ("performance" in window == false) {
			window.performance = {};
		}

		// thanks IE8
		Date.now = (Date.now || function () {
			return new Date().getTime();
		});

		if ("now" in window.performance == false) {
			var nowOffset = Date.now();

			if (performance.timing && performance.timing.navigationStart) {
				nowOffset = performance.timing.navigationStart
			}

			window.performance.now = function now() {
				return Date.now() - nowOffset;
			}
		}
	})();

	// forEach
	if (window.NodeList && !NodeList.prototype.forEach) {
		NodeList.prototype.forEach = function (callback, thisArg) {
			thisArg = thisArg || window;
			for (let i = 0; i < this.length; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		};
	}

	// CustomEvent
	(function () {
		if (typeof window.CustomEvent === 'function') return false;
		function CustomEvent(event, params) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent('CustomEvent');
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
		}

		CustomEvent.prototype = window.Event.prototype;

		window.CustomEvent = CustomEvent;
	})();

	// includes
	if (!Array.prototype.includes) {
		Object.defineProperty(Array.prototype, 'includes', {
			value: function (searchElement, fromIndex) {

				if (this == null) {
					throw new TypeError('"this" is null or not defined');
				}

				var o = Object(this);

				var len = o.length >>> 0;

				if (len === 0) {
					return false;
				}

				var n = fromIndex | 0;

				var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

				function sameValueZero(x, y) {
					return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
				}

				while (k < len) {
					if (sameValueZero(o[k], searchElement)) {
						return true;
					}
					k++;
				}

				return false;
			}
		});
	}

	// matches
	if (!Element.prototype.matches) {
		Element.prototype.matches =
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function (s) {
				let matches = (this.document || this.ownerDocument).querySelectorAll(s);
				let i = matches.length;
				// eslint-disable-next-line no-empty
				while (--i >= 0 && matches.item(i) !== this) { }
				return i > -1;
			};
	}

	if (!Element.prototype.matches) {
		Element.prototype.matches =
		Element.prototype.msMatchesSelector ||
		Element.prototype.webkitMatchesSelector;
	}

	// closest
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (s) {
			let el = this;

			do {
				if (el.matches(s)) {
					return el;
				}
				el = el.parentElement || el.parentNode;
			} while (el !== null && el.nodeType === 1);
			return null;
		};
	}

	// prepend
	(function (arr) {
		arr.forEach(function (item) {
			if (item.hasOwnProperty(`prepend`)) {
				return;
			}
			Object.defineProperty(item, `prepend`, {
				configurable: true,
				enumerable: true,
				writable: true,
				value: function prepend() {
					// eslint-disable-next-line prefer-rest-params
					let argArr = Array.prototype.slice.call(arguments);
					let docFrag = document.createDocumentFragment();

					argArr.forEach(function (argItem) {
						let isNode = argItem instanceof Node;
						docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
					});

					this.insertBefore(docFrag, this.firstChild);
				},
			});
		});
	})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

	// append
	(function (arr) {
		arr.forEach(function (item) {
			if (item.hasOwnProperty(`append`)) {
				return;
			}
			Object.defineProperty(item, `append`, {
				configurable: true,
				enumerable: true,
				writable: true,
				value: function append() {
					// eslint-disable-next-line prefer-rest-params
					let argArr = Array.prototype.slice.call(arguments);
					let docFrag = document.createDocumentFragment();

					argArr.forEach(function (argItem) {
						let isNode = argItem instanceof Node;
						docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
					});

					this.appendChild(docFrag);
				},
			});
		});
	})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

	// before
	(function (arr) {
		arr.forEach(function (item) {
			if (item.hasOwnProperty(`before`)) {
				return;
			}
			Object.defineProperty(item, `before`, {
				configurable: true,
				enumerable: true,
				writable: true,
				value: function before() {
					// eslint-disable-next-line prefer-rest-params
					let argArr = Array.prototype.slice.call(arguments);
					let docFrag = document.createDocumentFragment();

					argArr.forEach(function (argItem) {
						let isNode = argItem instanceof Node;
						docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
					});

					this.parentNode.insertBefore(docFrag, this);
				},
			});
		});
	})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

	// remove
	(function (arr) {
		arr.forEach(function (item) {
			if (item.hasOwnProperty(`remove`)) {
				return;
			}
			Object.defineProperty(item, `remove`, {
				configurable: true,
				enumerable: true,
				writable: true,
				value: function remove() {
					if (this.parentNode !== null) {
						this.parentNode.removeChild(this);
					}
				},
			});
		});
	})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

	// startsWith
	if (!String.prototype.startsWith) {
		// eslint-disable-next-line no-extend-native
		Object.defineProperty(String.prototype, `startsWith`, {
			value(search, rawPos) {
				let pos = rawPos > 0 ? rawPos | 0 : 0;
				return this.substring(pos, pos + search.length) === search;
			},
		});
	}

	// Fixes
	//---------------------------------

	// ie download
	const ie11Download = (el) => {
		if (el.href === ``) {
			throw Error(`The element has no href value.`);
		}

		let filename = el.getAttribute(`download`);
		if (filename === null || filename === ``) {
			const tmp = el.href.split(`/`);
			filename = tmp[tmp.length - 1];
		}

		el.addEventListener(`click`, (evt) => {
			evt.preventDefault();
			const xhr = new XMLHttpRequest();
			xhr.onloadstart = () => {
				xhr.responseType = `blob`;
			};
			xhr.onload = () => {
				navigator.msSaveOrOpenBlob(xhr.response, filename);
			};
			xhr.open(`GET`, el.href, true);
			xhr.send();
		});
	};

	if (window.navigator.msSaveBlob) {
		const downloadLinks = document.querySelectorAll(`a[download]`);
		if (downloadLinks.length) {
			downloadLinks.forEach((el) => {
				ie11Download(el);
			});
		}
	}

	// ie svg focus fix
	const unfocusableSvg = () => {
		if (!(!!window.MSInputMethodContext && !!document.documentMode)) {
			return;
		}

		const svg = document.querySelectorAll('svg');

		svg.forEach((el) => {
			el.setAttribute('focusable', 'false');
		});
	}

	unfocusableSvg();

	//ie footer nailing
	const ieFooterNailing = () => {
		const main = document.querySelector('main');
		const header = document.querySelector('.header');
		const footer = document.querySelector('.footer');

		let headerH;
		let footerH;
		let mainHMin;

		if (!main || !(!!window.MSInputMethodContext && !!document.documentMode)) {
			return;
		}

		const mainHeight = () => {
			// eslint-disable-next-line no-unused-expressions
			header ? headerH = header.getBoundingClientRect().height : headerH = 0;
			// eslint-disable-next-line no-unused-expressions
			footer ? footerH = footer.getBoundingClientRect().height : footerH = 0;
			mainHMin = window.innerHeight;

			main.style.minHeight = mainHMin - (headerH + footerH) + 'px';
		};

		document.addEventListener('loadDOMContentLoaded', mainHeight());
		window.addEventListener('resize', mainHeight);
	};

	ieFooterNailing();
};

export { ieFix };
