import * as bodyScrollLock from 'body-scroll-lock';

let vars = {};

vars.$document = $(document);
vars.$window = $(window);
vars.$body = $(document.body);
vars.$html = $(document.documentElement);
vars.isMobile = () => innerWidth <= 1024;
vars.isIE = () => vars.$html.hasClass('is-browser-ie');
vars.isIOS = () => vars.$html.hasClass('is-os-ios');
vars.winWidth = window.innerWidth;

/**
* Очистить текст от спецсимволов
* @param {string} text Обязательное, строка для очистки
* @returns {string} Очищенная строка
*/
vars.clearText = (text) => {
	return text.trim().replace(/\s+/g, ' ');
};

/**
* Создать куки запись
* @param {string} name Обязательное, название записи
* @param {string} value Обязательное, значение записи
* @param {string} days Обязательное, время для жизни
*/
vars.setCookie = (name, value, days) => {
	let expires = '';

	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = `; expires=${date.toUTCString()}`;
	}

	document.cookie = `${name}=${value || ''}${expires}; path=/`;
};

/**
* Получить куки запись
* @param {string} name Обязательное, название записи
*/
vars.getCookie = (name) => {
	let nameEQ = `${name}=`;
	let ca = document.cookie.split(';');

	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];

		while (c.charAt(0) === ' ') {
			c = c.substring(1, c.length);
		}

		if (c.indexOf(nameEQ) === 0) {
			return c.substring(nameEQ.length, c.length);
		}
	}

	return null;
};

/**
* Удалить куки запись
* @param {string} name Обязательное, название записи
*/
vars.eraseCookie = (name) => {
	document.cookie = `${name}=; Max-Age=-99999999;`;
};

let dataScrollLocks;
/**
* Блокирует скролл страницы
* Необходим для использования модальных окон
* @param {boolean} state Обязательное
* @param {string} element Обязательное, элемент которому нужно разрешить скролл
* @param {string} name Необязательное, ключ,
* чтобы была возможность открывать окно поверх другого окна
*/
vars.lockScroll = (state, $element, name) => {
	const element = $element.get(0) ? $element.get(0) : $element;

	if (typeof dataScrollLocks === 'undefined') {
		dataScrollLocks = new Set();
	}

	let scrollLocks = dataScrollLocks;

	if (state) {
		if (typeof name === 'string') {
			scrollLocks.add(name);
		}

		bodyScrollLock.disableBodyScroll(element, {
			reserveScrollBarGap: true,
		});

		setImmediate(() => {
			vars.$html.addClass('is-lock-scroll');
		});
	} else {
		if (typeof name === 'string') {
			scrollLocks.delete(name);
		}

		bodyScrollLock.enableBodyScroll(element);

		if (!scrollLocks.size) {
			bodyScrollLock.clearAllBodyScrollLocks();

			vars.$html.removeClass('is-lock-scroll');
		}
	}
};

/**
* Скролл до элемента
* @param {string} $container Обязательное, элемент к которому нужно скроллить
* @param {string|number} time Необязательное, время скролла
* @param {string|number} offset Необязательное, смещение скролла может быть + или -
*/
vars.scrollTo = ($container, time = 500, offset = 0) => {
	vars.$html.css('scroll-behavior', 'initial');
	$('html, body').stop().animate({
		scrollTop: `${$container.offset().top + parseInt(offset, 10)}`,
	}, parseInt(time, 10));

	setTimeout(() => {
		vars.$html.css('scroll-behavior', '');
	}, parseInt(time, 10) + 100);
};

let scrollDiv;

/**
* Получить размер скроллбара если он есть
* @returns {number} размер скроллбара
*/
vars.getScrollbarWidth = () => {
	const width = window.innerWidth - vars.$html.get(0).clientWidth;

	if (width || document.documentElement.clientHeight >= document.documentElement.offsetHeight) {
		return width;
	}

	// Document doesn't have a scrollbar, possibly because there is not enough content so browser doesn't show it
	if (!scrollDiv) {
		scrollDiv = document.createElement('div');
		scrollDiv.style.cssText = 'width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px';
		document.body.appendChild(scrollDiv);
	}

	return scrollDiv.offsetWidth - scrollDiv.clientWidth;
};

/**
* Узнать есть доступен ли ховер
* @returns {boolean}
*/
function hasHoverSupport() {
	let hoverSupport;

	if (vars.isIE && vars.getScrollbarWidth()) {
		// On touch devices scrollbar width is usually 0
		hoverSupport = true;
	} else if (vars.isMobile()) {
		hoverSupport = false;
	} else if (window.matchMedia('(any-hover: hover)').matches || window.matchMedia('(hover: hover)').matches) {
		hoverSupport = true;
	} else if (window.matchMedia('(hover: none)').matches) {
		hoverSupport = false;
	} else {
		hoverSupport = typeof vars.$html.ontouchstart === 'undefined';
	}

	return hoverSupport;
}

if (!hasHoverSupport()) {
	vars.$html.removeClass('has-hover').addClass('no-hover');
} else {
	vars.$html.removeClass('no-hover').addClass('has-hover');
}

/**
* Переопределение доступности ховера
*/
function resize() {
	setTimeout(() => {
		if (vars.winWidth !== window.innerWidth) {
			if (!hasHoverSupport()) {
				vars.$html.removeClass('has-hover').addClass('no-hover');
			} else {
				vars.$html.removeClass('no-hover').addClass('has-hover');
			}

			vars.winWidth = window.innerWidth;
		}
	}, 300);
}

vars.$window.on('resize', resize);

export default vars;
