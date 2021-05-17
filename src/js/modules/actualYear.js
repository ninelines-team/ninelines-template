/**
* Модуль "Актуальный год"
*/
export const actualYear = () => {
	const year = new Date().getFullYear();

	if (document.querySelector('[data-actual-year]')) {
		document.querySelector('[data-actual-year]').textContent = year;
	}
};
