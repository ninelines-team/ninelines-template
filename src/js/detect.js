(() => {
	let iterate = (items, callback) => {
		items.forEach((item) => {
			let key;
			let value;

			if (typeof item === 'string') {
				key = item;
				value = item;
			} else {
				key = item[0];
				value = item[1];
			}

			callback(key, value);
		});
	};

	let check = (category, items) => {
		iterate(items, (key, value) => {
			if (bowser[key]) {
				document.documentElement.classList.add(`is-${category}-${value}`);
			}
		});
	};

	check(
		'engine',
		[
			'blink',
			'gecko',
			['msedge', 'edge'],
			['msie', 'ie'],
			'webkit',
		]
	);

	check(
		'device',
		[
			'mobile',
			'tablet',
		]
	);

	check(
		'browser',
		[
			'android',
			'bada',
			'blackberry',
			'chrome',
			'firefox',
			'ios',
			'kMeleon',
			['msedge', 'edge'],
			['msie', 'ie'],
			'opera',
			'phantom',
			'qupzilla',
			'safari',
			'sailfish',
			['samsungBrowser', 'samsung'],
			'seamonkey',
			'silk',
			'sleipnir',
			'tizen',
			'ucbrowser',
			'vivaldi',
			'webos',
			['yandexbrowser', 'yandex'],
		]
	);

	check(
		'os',
		[
			'android',
			'bada',
			'blackberry',
			'chromeos',
			'firefoxos',
			'ipad',
			'iphone',
			'ipod',
			'ios',
			'linux',
			'mac',
			'windows',
			'windowsphone',
			'sailfish',
			'tizen',
			'webos',
		]
	);
})();
