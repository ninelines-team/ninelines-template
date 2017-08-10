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
				$(document.documentElement).addClass(`is-${category}-${value}`);
			}
		});
	};

	check(
		'engine',
		[
			'webkit',
			'blink',
			'gecko',
			['msie', 'ie'],
			['msedge', 'edge'],
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
			'chrome',
			'firefox',
			['msie', 'ie'],
			['msedge', 'edge'],
			'safari',
			'android',
			'ios',
			'opera',
			['samsungBrowser', 'samsung'],
			'phantom',
			'blackberry',
			'webos',
			'silk',
			'bada',
			'tizen',
			'seamonkey',
			'sailfish',
			'ucbrowser',
			'qupzilla',
			'vivaldi',
			'sleipnir',
			'kMeleon',
		]
	);

	check(
		'os',
		[
			'mac',
			'windows',
			'windowsphone',
			'linux',
			'chromeos',
			'android',
			'ios',
			'iphone',
			'ipad',
			'ipod',
			'blackberry',
			'firefoxos',
			'webos',
			'bada',
			'tizen',
			'sailfish',
		]
	);
})();
