import helpers from '../helpers';

/**
* Модуль "Переключатель для поля ввода пароля"
* @param {string} $field Обязательное, поле input
* @param {string} $icon Обязательное, иконка которую нужно менять
*/
const toggle = ($field, $icon) => {
	const togglingClass = 'is-closed';
	const fieldState = {
		shown: 'text',
		hidden: 'password',
	};

	if ($icon.hasClass(togglingClass)) {
		$field.prop('type', fieldState.hidden);
	} else {
		$field.prop('type', fieldState.shown);
	}

	$icon.toggleClass(togglingClass);
};

const init = () => {
	helpers.$document.on('click.eye', '.js-drop-eye', (e) => {
		const $dropEyeIcon = $(e.currentTarget).find('.icon-eye');
		const $passwordField = $dropEyeIcon.closest('.group').find('input');

		toggle($passwordField, $dropEyeIcon);
	});
};

const destroy = () => {
	helpers.$document.off('.eye');
};

export default {
	init,
	destroy,
};
