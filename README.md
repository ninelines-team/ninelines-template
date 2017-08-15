* [Основные возможности и используемые технологии](docs/01_technologies.md)
* [Минимальные требования](docs/02_requirements.md)
* [Начало работы](docs/03_installation.md)
* [Gulp-задачи](docs/04_tasks.md)
	* [`default`](docs/04_tasks.md#default)
	* [`build`](docs/04_tasks.md#build)
	* [`watch`](docs/04_tasks.md#watch)
	* [`serve`](docs/04_tasks.md#serve)
	* [`pug`](docs/04_tasks.md#pug)
	* [`images`](docs/04_tasks.md#images)
	* [`pngSprites`](docs/04_tasks.md#pngSprites)
	* [`svgSprites`](docs/04_tasks.md#svgSprites)
	* [`scss`](docs/04_tasks.md#scss)
	* [`jsMain`](docs/04_tasks.md#jsMain)
	* [`jsVendor`](docs/04_tasks.md#jsVendor)
	* [`copy`](docs/04_tasks.md#copy)
	* [`lint`](docs/04_tasks.md#lint)
	* [`lintJs`](docs/04_tasks.md#lintJs)
	* [`lintPug`](docs/04_tasks.md#lintPug)
	* [`lintScss`](docs/04_tasks.md#lintScss)
	* [`zip`](docs/04_tasks.md#zip)
* [Структура](docs/05_structure.md)
	* `src`
	* `src/images`
	* `src/images/sprites`
	* `src/images/sprites/png`
	* `src/images/sprites/svg`
	* `src/js`
	* `src/js/vendor`
	* `src/js/detect.js`
	* `src/js/globals.js`
	* `src/js/main.js`
	* `src/js/vendor.js`
	* `src/pug`
	* `src/pug/mixins`
	* `src/pug/mixins/svg.pug`
	* `src/pug/base.pug`
	* `src/resources`
	* `src/resources/fonts`
	* `src/scss`
	* `src/scss/functions`
	* `src/scss/functions/_sprites.scss`
	* `src/scss/mixins`
	* `src/scss/mixins/_retina.scss`
	* `src/scss/mixins/_sprites.scss`
	* `src/scss/mixins/_triangle.scss`
	* `src/scss/vendor`
	* `src/scss/_base.scss`
	* `src/scss/_fonts.scss`
	* `src/scss/_functions.scss`
	* `src/scss/_mixins.scss`
	* `src/scss/_sprites.hbs`
	* `src/scss/_sprites.scss`
	* `src/scss/_variables.scss`
	* `src/scss/_vendor.scss`
	* `src/scss/main.scss`
	* `src/index.pug`
	* `.babelrc`
	* `.editorconfig`
	* `.eslintignore`
	* `.eslintrc`
	* `.gitignore`
	* `.npmrc`
	* `.pug-lintrc.json`
	* `.stylelintrc`
	* `bitbucket-pipelines.yml`
	* `gulpfile.babel.js`
	* `package.json`
	* `README.md`
	* `router-config.js`
* [Подключение сторонних библиотек](docs/06_libraries.md)
* [Работа с изображениями](docs/07_images.md)
	* Работа с PNG-спрайтами
	* Работа с SVG-спрайтами
* [Работа с шаблонизатором Pug](docs/08_templates.md)
	* Базовый шаблон и создание страниц
		* `vars`
		* `meta`
		* `links`
		* `content`
		* `scripts`
	* Правила написания кода и использование линтера
* [Работа со стилями](docs/09_styles.md)
	* Правила написания кода
		* БЭМ
		* Классы состояний
		* Порядок CSS-свойств
		* Переменные
		* `@mixin` и `@extend`
		* Вендорные префиксы
	* Использование линтера
* [Работа со скриптами](docs/10_scripts.md)
	* Правила написания кода
		* Глобальные переменные
		* Короткие именна переменных
		* Именование jQuery-переменных
		* jQuery-селекторы
		* Обработка событий с помощью jQuery
	* Использование линтера
* [Работа с дополнительными ресурсами](docs/11_resources.md)
	* Работа со шрифтами
		* Подключение шрифта с помощью Google Fonts
		* Конвертирование шрифта и подключение с помощью `@font-face`.
