import helpers from '../helpers';

/**
* iOS не уважает "user-scalable=no", и пока они это делают
* по соображениям доступности существуют случаи использования, когда мы действительно хотим
* предотвратить масштабирование пользователей.
*
* Используйте только в том случае, если вы знаете, что вам это нужно!!!
*/

if (helpers.isIOS() && helpers.isMobile) {
	/**
	* Предотвратите масштабирование с помощью пинча, если текущий масштаб уже равен 1
	*/
	let lastKnownScale = null;

	const handleTouchEvent = function (event) {
		lastKnownScale = event.scale;
	};

	const handleTouchMove = function (event) {
		if (event.scale !== 1) {
			if (lastKnownScale === 1) {
				event.preventDefault();
			}
		} else if (event.scale === 1) {
			lastKnownScale = 1;
		}

		lastKnownScale = event.scale;
	};

	document.addEventListener('touchstart', handleTouchEvent, false);
	document.addEventListener('touchmove', handleTouchMove, false);

	/**
	* Отключите двойное нажатие,которое в iOS будет увеличивать масштаб элемента
	*/

	let lastTouchTime = 0;

	const handleTouchTap = function (event) {
		const now = Date.now();

		if (now - lastTouchTime <= 400) {
			event.preventDefault();
		}

		lastTouchTime = now;
	};

	document.addEventListener('touchend', handleTouchTap, false);
}
