let vars = {};
export let lastPageYOffset = null;

vars.$document = $(document);
vars.$window = $(window);
vars.$body = $(document.body);
vars.$html = $(document.documentElement);
vars.$siteContainer = $('.site-container');
vars.$preloader = $('.preloader');
vars.$header = $('.header');
vars.isMobile = () => innerWidth <= 1024;
vars.isIE = () => vars.$html.hasClass('is-browser-ie');
vars.winWidth = window.innerWidth;

const debounced = [];
const cancelFunc = (timeout) => () => {
	clearTimeout(timeout);
};

vars.debounce = (fn, wait, ...args) => {
	let d = debounced.find(({funcString}) => funcString === fn.toString());

	if (d) {
		d.cancel();
	} else {
		d = {};
		debounced.push(d);
	}

	d.func = fn;
	d.funcString = fn.toString();
	d.timeout = setTimeout(fn, wait, ...args);
	d.cancel = cancelFunc(d.timeout);
};

vars.saveScrollPosition = () => {
	vars.$html.css('scroll-behavior', 'initial');
	lastPageYOffset = window.pageYOffset || document.documentElement.scrollTop;
};

vars.restoreScrollPosition = () => {
	if (lastPageYOffset !== null) {
		window.scrollTo(window.pageXOffset, lastPageYOffset);
		lastPageYOffset = null;
		vars.$html.css('scroll-behavior', '');
	}
};

// smooth scrolling
vars.scrollTo = ($container, time = 500, offset = 0) => {
	vars.$html.css('scroll-behavior', 'initial');
	$('html, body').animate({
		scrollTop: `${$container.offset().top + offset}`,
	}, time);

	setTimeout(() => {
		vars.$html.css('scroll-behavior', '');
	}, time + 100);
};

let scrollDiv;

vars.getScrollbarWidth = () => {
	const width = window.innerWidth - vars.$html.clientWidth;

	if (width) {
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

function resize() {
	vars.debounce(() => {
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
