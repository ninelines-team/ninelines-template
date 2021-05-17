/**
* Модуль "Счетчик"
*/
class Counter {
	constructor(initialValue, minValue) {
		this.value = initialValue;
		this.minValue = minValue;
	}

	inc() {
		this.value++;
	}

	dec() {
		if (this.value > this.minValue) {
			this.value--;
		}
	}
}

class CounterInput extends Counter {
	constructor($inputSelector) {
		super();

		this.$inputSelector = $inputSelector;
		this.value = this.$inputSelector.val();
		this.minValue = this.$inputSelector.data('min');
	}

	/**
	* @param {number} Значение
	*/
	set inputValue(value) {
		if (value >= this.minValue) {
			this.value = value;
			this.$inputSelector.val(this.value);
		}
	}

	inc() {
		super.inc();
		this.inputValue = this.value;
	}

	dec() {
		super.dec();
		this.inputValue = this.value;
	}
}

const init = () => {
	$('.js-counter').each((i, el) => {
		const $container = $(el);
		const $input = $container.find('.js-counter-input');
		const $plus = $container.find('.js-counter-plus');
		const $minus = $container.find('.js-counter-minus');
		// eslint-disable-next-line no-shadow
		const counter = new CounterInput($input);

		$plus.on('click.counter', () => {
			counter.inc();
		});

		$minus.on('click.counter', () => {
			counter.dec();
		});

		$input.on('input.counter', (e) => {
			if (e.target.value.match(/[^0-9]/g)) {
				e.target.value = e.target.value.replace(/[^0-9]/g, '');
			}

			if (e.target.value === '' || e.target.value < $(e.currentTarget).data('min')) {
				e.target.value = $(e.currentTarget).data('min');
			}

			counter.inputValue = e.target.value;
		});
	});
};

const destroy = () => {
	$('.js-counter-plus').off('.counter');
	$('.js-counter-minus').off('.counter');
	$('.js-counter-input').off('.counter');
};

export default {
	init,
	destroy,
};
