/* global yaCounterNUMBERID */
import helpers from '../helpers';
import scrollDepth from 'scroll-depth';

function start15SecTimeout() {
	clearTimeout(helpers.$window.data('timeout15Sec'));

	helpers.$window.data('timeout15Sec', setTimeout(() => {
		ga('rbcspec.send', 'event', 'page', 'spent_on_page_15_sec');
		ga('send', 'event', 'page', 'spent_on_page_15_sec');
	}, 15000));
}

start15SecTimeout();

scrollDepth({
	userTiming: false,
	pixelDepth: false,
	gtmOverride: true,
	eventHandler(data) {
		ga('send', 'event', data.eventCategory, data.eventAction, data.eventLabel, {nonInteraction: false});
		ga('rbcspec.send', 'event', data.eventCategory, data.eventAction, data.eventLabel, {nonInteraction: false});
	},
});

/**
* Создать куки запись
* @param {string} path Обязательное, ссылка/путь
*/
function virtualHit(path) {
	if (window.ga) {
		ga('set', 'page', path);
		ga('send', 'pageview', path);
		// Не всегда используются
		// ga('rbcspec.set', 'page', path);
		// ga('rbcspec.send', 'pageview', path);
	}

	// NUMBERID нужно менять для каждого проекта, так же используется в PUG
	if (window.yaCounterNUMBERID) {
		yaCounterNUMBERID.hit(path);
	}
}

export default {
	start15SecTimeout,
	virtualHit,
};
