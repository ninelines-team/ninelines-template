# Описание

**project-template** — шаблон для быстрого старта разработки сайтов.

# Основные возможности и используемые технологии

* Автоматическая оптимизация изображений.
* Генерация PNG- и SVG-спрайтов.
* Шаблонизация с помощью Pug.
* CSS-препроцессор SCSS и Autoprefixer.
* ES6 (без модулей) и jQuery.
* Встроенное определение устройтва, браузера и операционной системы пользователя.
* Проверка кода линтерами (pug-lint, stylelint, ESLint).
* Browsersync, автоматическое обновление страницы при разработке.
* Возможность быстро создать архив проекта.
* Множество дополнительных параметров сборки.

# Установка и начало работы

```bash
git clone https://github.com/beliarh/project-template.git
cd project-template
npm install
gulp
```

# Минимальные требования

* node >= 8.2.1
* npm >= 5.3.0
* gulp >= 4.0.0-alpha.2
* gulp-cli >= 1.4.0

# Gulp-задачи

## `default`

`gulp default` (или просто `gulp`) — основная задача, запускает `build`, `watch` и `serve`.

## build

`gulp build` — сборка всех файлов, запускает задачи `copy`, `images`, `svgSprites`, `pngSprites`, `jsMain`, `jsVendor`, `pug`, `scss`.

## `watch`

`gulp watch` — запускает слежение за файлами, так что при изменении они автоматически пересобираются.

## `serve`

`gulp serve` — запускает сервер Browsersync.

Дополнительные параметры:

* `--browser` - задает браузер, в котором следует открыть сайт.
* `--no-html-ext` - разрешает переходы по страницам без указания расширения `.html`.
* `--no-open` - отключает автоматический запуск браузера.
* `--port` - задает порт сервера.
* `--spa` - включает режим одностраничного приложения.

## `pug`

`gulp pug` — запускает сборку Pug-шаблонов.

Дополнительные параметры:

* `--no-cache` - отключает кэширование.
* `--no-debug` - отключает отладочный вывод списка обрабатываемых файлов.
* `--no-notify` - отключает уведомления об ошибках.
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `images`

`gulp images` — запускает сборку и оптимизацию изображений.

Дополнительные параметры:

* `--no-cache` - отключает кэширование.
* `--no-debug` - отключает отладочный вывод списка обрабатываемых файлов.
* `--no-notify` - отключает уведомления об ошибках.
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `pngSprites`

`gulp pngSprites` — запускает генерацию PNG-спрайтов.

Дополнительные параметры:

* `--no-debug` - отключает отладочный вывод списка обрабатываемых файлов.
* `--no-notify` - отключает уведомления об ошибках.
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `svgSprites`

`gulp svgSprites` — запускает генерацию SVG-спрайтов.

Дополнительные параметры:

* `--no-debug` - отключает отладочный вывод списка обрабатываемых файлов.
* `--no-notify` - отключает уведомления об ошибках.
* `--production` - включает режим production (отключает форматирование SVG-спрайта).
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `scss`

`gulp scss` — запускает сборку стилей.

Дополнительные параметры:

* `--no-debug` - отключает отладочный вывод списка обрабатываемых файлов.
* `--no-notify` - отключает уведомления об ошибках.
* `--no-sourcemaps` - отключает создание map-файлов.
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `jsMain`

`gulp jsMain` — запускает сборку основных скриптов.

Дополнительные параметры:

* `--no-debug` - отключает отладочный вывод списка обрабатываемых файлов.
* `--no-notify` - отключает уведомления об ошибках.
* `--production` - включает режим production (убирает `console.log` из кода).
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `jsVendor`

`gulp jsVendor` — запускает сборку скриптов сторонних библиотек.

Дополнительные параметры:

* `--no-cache` - отключает кэширование.
* `--no-debug` - отключает отладочный вывод списка обрабатываемых файлов.
* `--no-notify` - отключает уведомления об ошибках.
* `--production` - включает режим production (включает минификацию файла).
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `copy`

`gulp copy` — запускает сборку дополнительных ресурсов.

Дополнительные параметры:

* `--no-cache` - отключает кэширование.
* `--no-debug` - отключает отладочный вывод списка обрабатываемых файлов.

## `lint`

`gulp lint` — последовательно запускает линтеры `lintJs`, `lintPug`, `lintScss`.

## `lintJs`

`gulp lintJs` — проверяет JavaScript-файлы линтером ESLint.

Дополнительные параметры:

* `--fix` - автоматически исправляет найденные ошибки.
* `--no-notify` - отключает уведомления об ошибках.
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `lintPug`

`gulp lintPug` — проверяет Pug-файлы линтером pug-lint.

Дополнительные параметры:

* `--no-notify` - отключает уведомления об ошибках.
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `lintScss`

`gulp lintScss` — проверяет SCSS-файлы линтером stylelint.

Дополнительные параметры:

* `--no-notify` - отключает уведомления об ошибках.
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `zip`

`gulp zip` — создает архив проекта.

Дополнительные параметры:

* `--base` - задает папку относительно которой строится архив (по умолчанию - корень проекта).
* `--exclude` - задает список файлов и папок, которые следует исключить из архива.
* `--include` - задает список файлов и папок, которые следует включить в архив.
* `--name` - задает название файла.
* `--no-compress` - отключает сжатие архива.
* `--no-time` - убирает из названия архива дату и время создания.
* `--only` - добавляет в архив только указанные файлы и папки.

# Структура

```textmate
project-template
├── src
│   ├── images
│   │   └── sprites
│   │       ├── png
│   │       │   └── .keep
│   │       └── svg
│   │           └── .keep
│   ├── js
│   │   ├── vendor
│   │   │   └── .keep
│   │   ├── detect.js
│   │   ├── globals.js
│   │   ├── main.js
│   │   └── vendor.js
│   ├── pug
│   │   ├── mixins
│   │   │   └── svg.pug
│   │   └── base.pug
│   ├── resources
│   │   └── fonts
│   │       └── .keep
│   ├── scss
│   │   ├── functions
│   │   │   └── _sprites.scss
│   │   ├── mixins
│   │   │   ├── _retina.scss
│   │   │   ├── _sprites.scss
│   │   │   └── _triangle.scss
│   │   ├── vendor
│   │   │   └── .keep
│   │   ├── _base.scss
│   │   ├── _fonts.scss
│   │   ├── _functions.scss
│   │   ├── _mixins.scss
│   │   ├── _sprites.hbs
│   │   ├── _sprites.scss
│   │   ├── _variables.scss
│   │   ├── _vendor.scss
│   │   └── main.scss
│   └── index.pug
├── .babelrc
├── .editorconfig
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .npmrc
├── .pug-lintrc.json
├── .stylelintrc
├── bitbucket-pipelines.yml
├── gulpfile.babel.js
├── package.json
├── README.md
└── router-config.js
```

## `src`

В папке `src` хранятся исходные файлы проекта.

## `src/images`

Папка `images` предназначена для хранения изображений.
При сборке файлы из данной папки попадают в `build/images`.

## `src/images/sprites`

Папка `src/images/sprites` предназначена для хранения векторных (SVG) и растровых (PNG) иконок.

## `src/images/sprites/png`

Папка `src/images/sprites/png` предназначена для хранения растровых иконок.
При сборке файлы из данной папки объединяются в два спрайта: `build/images/sprites.png` и `build/images/sprites@2x.png`.

## `src/images/sprites/svg`

Папка `src/images/sprites/svg` предназначена для хранения векторных иконок.
При сборке файлы из данной папки объединяются в один спрайт: `build/images/sprites.svg`.

## `src/js`

Папка `src/js` предназначена для хранения скриптов.

## `src/js/vendor`

Папка `src/js/vendor` предназначена для хранения скриптов сторонних библиотек, которых нет в репозитории npm.

## `src/js/detect.js`

Файл `src/js/detect.js` предназначен для определения устройства, браузера и операционной системы пользователя.

## `src/js/globals.js`

Файл `src/js/globals.js` предназначен для хранения глобальных переменных.

## `src/js/main.js`

Файл `src/js/main.js` предназначен для хранения основной логики сайта.
При сборке данный файл попадает в `build/js`.

## `src/js/vendor.js`

Файл `src/js/vendor.js` предназначен для подключения скриптов сторонних библиотек.
При сборке данный файл попадет в `build/js`.

## `src/pug`

Папка `src/pug` предназначена для хранения шаблонов.

## `src/pug/mixins`

Папка `src/pug/mixins` предназначена для хранения Pug-миксинов.

## `src/pug/mixins/svg.pug`

В файле `src/pug/mixins/svg.pug` хранится Pug-миксин для подключения SVG-иконок.

## `src/pug/base.pug`

В файле `src/pug/base.pug` хранится базовый шаблон страниц сайта.

## `src/resources`

Папка `src/resources` предназначена для хранения различных файлов проекта.
При сборке файлы из данной папки попадают в `build`.

## `src/resources/fonts`

Папка `src/resources/fonts` предназначена для хранения шрифтов.
При сборке файлы из данной папки попадают в `build/fonts`.

## `src/scss`

Папка `src/scss` предназначена для хранения стилей.

## `src/scss/functions`

Папка `src/scss/functions` предназначена для хранения SCSS-функций.

## `src/scss/functions/_sprites.scss`

В файле `src/scss/functions/_sprites.scss` хранятся SCSS-функции для работы с PNG-спрайтами.

## `src/scss/mixins`

Папка `src/scss/mixins` предназначена для хранения SCSS-миксинов.

## `src/scss/mixins/_retina.scss`

В файле `src/scss/mixins/_retina.scss` хранится SCSS-миксин для работы с retina.

## `src/scss/mixins/_sprites.scss`

В файле `src/scss/mixins/_sprites.scss` хранятся SCSS-миксины для работы с PNG-спрайтами.

## `src/scss/mixins/_triangle.scss`

В файле `src/scss/mixins/_triangle.scss` хранится SCSS-миксин для создания CSS-треугольников.

## `src/scss/vendor`

Папка `src/scss/vendor` предназначена для хранения стилей сторонних библиотек, которых нет в репозитории npm.

## `src/scss/_base.scss`

Файл `src/scss/_base.scss` предназначен для хранения базовых стилей.

## `src/scss/_fonts.scss`

Файл `src/scss/_fonts.scss` предназначен для подключения шрифтов.

## `src/scss/_functions.scss`

Файл `src/scss/_functions.scss` предназначен для подключения функций из папки `src/scss/functions`.

## `src/scss/_mixins.scss`

Файл `src/scss/_mixins.scss` предназначен для подключения миксинов из папки `src/scss/mixins`.

## `src/scss/_sprites.hbs`

`src/scss/_sprites.hbs` — шаблон, на основе которого генерируется содержимое файла `src/scss/_sprites.scss`.

## `src/scss/_sprites.scss`

Файл `src/scss/_sprites.scss` предназначен для работы с PNG-спрайтами.
Содержимое данного файла автоматически генерируется на основе шаблона `src/scss/_sprites.hbs` и иконок из папки `src/images/sprites/png`.

## `src/scss/_variables.scss`

Файл `src/scss/_variables.scss` предназначен для хранения SCSS-переменных.

## `src/scss/_vendor.scss`

Файл `src/scss/_vendor.scss` предназначен для подключения стилей сторонних библиотек.

## `src/scss/main.scss`

Файл `src/scss/main.scss` предназначен для хранения основных стилей сайта.
При сборке данный файл преобразуется в CSS и сохраняется в `build/css` вместе с файлом `main.css.map`.

## `src/index.pug`

`src/index.pug` — шаблон главной страницы.
При сборке все Pug-файлы из папки `src` преобразуются в HTML и сохраняются в `build`.

## `.babelrc`

`.babelrc` — файл настроек JavaScript-транспайлера Babel.

## `.editorconfig`

`.editorconfig` — файл настроек редактора.

## `.eslintignore`

`.eslintignore` — файл настроек ESLint для игнорирования файлов.

## `.eslintrc`

`.eslintrc` — файл настроек ESLint.

## `.gitignore`

`.gitignore` — файл настроек Git для игнорирования файлов.

## `.npmrc`

`.npmrc` — файл настроек npm.

## `.pug-lintrc.json`

`.pug-lintrc` — файл настроек pug-lint.

## `.stylelintrc`

`.stylelintrc` — файл настроек stylelint.

## `bitbucket-pipelines.yml`

`bitbucket-pipelines.yml` — файл настроек Bitbucket Pipelines.

## `gulpfile.babel.js`

`gulpfile.babel.js` — основной файл сборки, содержащий Gulp-задачи.

## `package.json`

`package.json` — файл, содержащий базовую информацию о проекте и список требуемых библиотек.

## `README.md`

`README.md` — документация.

## `router-config.js`

`router-config.js` — файл настроек роутинга Browsersync (только для одностраничных приложений).

# Подключение сторонних библиотек

Библиотеки подключаются с помощью npm.
При установке следует указывать ключ `--save` или `--save-dev`.

`--save` указывается для библиотек, код которых попадает в итоговую сборку (папку `build`).<br>
`--save-dev` указывается для библиотек, которые используются только для сборки.

После установки необходимо подключить нужные файлы библиотеки:
* скрипты — в `src/js/vendor.js`.
* стили — в `src/scss/_vendor.scss`.
* изображения — в `src/images`.
* любые другие файлы — в `src/resources`.

Если библиотека отсутствует в npm, либо её нужно модифицировать, то файлы следует скачать и закинуть в папки `src/js/vendor` и `src/scss/vendor`.
