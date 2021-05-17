/**
* Плюрализация (множественность) текста
*
* @param {number} count Значение
* @param {array} translations Список переводов
* @returns {string} Перевод
*
* @example
* transchoice(12, [
* '%count% months', // 0
* '%count% month', // 1, 21,
* '%count% months', // 2, 3, 4, 22, 23,
* '%count% months' //
* ]); // => '12 months'
*
* @example
* transchoice(23, [
* '%count% комнат', // 0
* '%count% комната', // 1, 21,
* '%count% комнаты', // 2, 3, 4, 22, 23,
* '%count% комнат' //
* ]); // => '23 комнаты'
*/

export const transchoice = (count, translations) => {
	let text;
	let cnt = parseInt(count, 10);
	let rem;

	if (!translations || !translations.length) {
		return String(count);
	}
	rem = cnt % 10;

	if (cnt === 0) {
		// 0
		text = translations[0];
	} else if (rem === 1 && cnt !== 11) {
		// Ending with 1, except 11
		text = translations[1];
	} else if (rem >= 2 && rem <= 4 && cnt !== 12 && cnt !== 13 && cnt !== 14) {
		// Ending with 2, 3 or 4, except 12, 13 and 14
		text = translations[2];
	} else if (translations[3] === undefined || translations[3] === null) {
		text = translations[2];
	} else {
		text = translations[3];
	}

	// Replace in string %count%
	return String(text).replace(/%count%/g, count);
};
