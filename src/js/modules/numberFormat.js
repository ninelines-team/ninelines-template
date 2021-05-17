/**
* Форматирование числа, добавляет тысячный разделитель, если значение больше 9999, либо десятичный разделитель
* * Это очень простая версия Intl.NumberFormat; если это имеет смысл,
* * возможно, заменить на Intl везде вместо того, чтобы использовать это
*
* @param {number|string} number Число
* @returns {string} Форматирование числа
*/

const numberThousandSeparator = window.LOCALES && (window.LOCALES.numberThousandSeparator || window.LOCALES.numberThousandSeparator === '') ? window.LOCALES.numberThousandSeparator : ' ';
const numberDecimalSeparator = window.LOCALES && (window.LOCALES.numberDecimalSeparator || window.LOCALES.numberDecimalSeparator === '') ? window.LOCALES.numberDecimalSeparator : '.';

export const numberFormat = (number, decimals = 0, decimalSeparator, thousandSeparator) => {
	let num = parseFloat(number);
	let str = '';

	// Округление числа до десятичных символов
	num = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

	// Преобразование в строку
	if (num === 0) {
		return '0';
	} else if (decimals) {
		str = num.toFixed(decimals);
	} else {
		str = `${num}`;
	}

	return str
		.replace(/(\d)(\d{3})(\.|$)/, `$1${numberThousandSeparator || thousandSeparator}$2$3`)
		.replace(/(\d)(\d{3})(\s)/, `$1${numberThousandSeparator || thousandSeparator}$2$3`)
		.replace('.', decimalSeparator || numberDecimalSeparator);
};
