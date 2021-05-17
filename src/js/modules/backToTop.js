import helpers from '../helpers';

/**
* Модуль "Возврат наверх"
*/
const init = () => {
	const className = '.js-back-to-top';
	const shownClass = 'is-shown';
	let lastScrollTop = 0;

	helpers.$document.on('click.backTop', `${className}`, () => {
		helpers.scrollTo($('body'));
	});

	helpers.$window.on('scroll.backTop', () => {
		const scrollTop = window.pageYOffset;

		if (scrollTop > window.innerHeight) {
			if (lastScrollTop > scrollTop) {
				$(className).addClass(shownClass);
			} else {
				$(className).removeClass(shownClass);
			}
		} else {
			$(className).removeClass(shownClass);
		}

		lastScrollTop = scrollTop;
	});
};

const destroy = () => {
	helpers.$window.off('.backTop');
	helpers.$document.off('.backTop');
};

export default {
	init,
	destroy,
};
