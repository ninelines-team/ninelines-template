import lozad from 'lozad';

let observer;

/**
* Модуль "Отложенная загрузка изображений"
* https://github.com/ApoorvSaxena/lozad.js
*/
const init = () => {
	observer = lozad('.js-lazy', {
		rootMargin: '10px 0px', // syntax similar to that of CSS Margin
		threshold: 0.1, // ratio of element convergence
		enableAutoReload: true, // it will reload the new image when validating attributes changes
		loaded(el) {
			el.classList.add('is-loaded');
		},
	});

	observer.observe();
};

/**
* Тригер для загрузки изображений до того, как оно появится в наблюдателе области просмотра
* @param {string} img Обязательное, элемент img
*/
const trigger = (img) => {
	observer.triggerLoad(img);
};

export default {
	init,
	trigger,
};
