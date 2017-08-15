# Описание

**project-template** — шаблон для быстрого старта разработки сайтов.

# Основные возможности и используемые технологии

* Система сборки [Gulp](https://gulpjs.com/)
* Автоматическая оптимизация изображений.
* Генерация PNG- и SVG-спрайтов.
* Шаблонизация с помощью [Pug](https://pugjs.org/).
* CSS-препроцессор [SCSS](http://sass-lang.com/) и [Autoprefixer](https://autoprefixer.github.io/ru/).
* ES6 (без модулей) и [jQuery](https://jquery.com/).
* Встроенное определение устройства, браузера и операционной системы пользователя.
* Проверка кода линтерами ([pug-lint](https://www.npmjs.com/package/pug-lint), [stylelint](https://stylelint.io/), [ESLint](http://eslint.org/)).
* [Browsersync](https://www.browsersync.io/), автоматическое обновление страницы при разработке.
* Возможность быстро создать архив проекта.
* Множество дополнительных параметров сборки.

# Минимальные требования

* node >= 8.2.1
* npm >= 5.3.0
* gulp >= 4.0.0-alpha.2
* gulp-cli >= 1.4.0

[Ссылка на инструкцию по переходу с gulp 3 на gulp 4](https://demisx.github.io/gulp4/2015/01/15/install-gulp4.html).

# Начало работы

Для начала работы над проектом необходимо [скачать архив](https://github.com/beliarh/project-template/archive/master.zip) или клонировать текущий репозиторий:

```bash
git clone https://github.com/beliarh/project-template.git
```

После распаковки архива рекомендуется изменить название проекта в файле `package.json` (ключ `name`) в соответствии с названием разрабатываемого сайта.

Далее следует установить npm-библиотеки:

```bash
npm install
```

По завершению можно запускать сборку и приступать к верстке:

```bash
gulp
```

# Gulp-задачи

## `default`

`gulp default` (или просто `gulp`) — основная задача, запускает `build`, `watch` и `serve`.

## `build`

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

`gulp lintJs` — проверяет JavaScript-файлы линтером [ESLint](http://eslint.org/).

Дополнительные параметры:

* `--fix` - автоматически исправляет найденные ошибки.
* `--no-notify` - отключает уведомления об ошибках.
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `lintPug`

`gulp lintPug` — проверяет Pug-файлы линтером [pug-lint](https://github.com/pugjs/pug-lint).

Дополнительные параметры:

* `--no-notify` - отключает уведомления об ошибках.
* `--throw-errors` - прерывает выполнение задачи при ошибке.

## `lintScss`

`gulp lintScss` — проверяет SCSS-файлы линтером [stylelint](https://stylelint.io/).

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

```text
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

Пример:

```bash
npm install --save jquery
npm install --save-dev gulp
```

`--save` указывается для библиотек, код которых попадает в итоговую сборку (папку `build`) и будет использоваться на сайте.<br>
`--save-dev` указывается для библиотек, которые используются только для сборки.

После установки необходимо подключить нужные файлы библиотеки:

* скрипты — в `src/js/vendor.js` (рекомендуется подключать неминифицированные файлы).
* стили — в `src/scss/_vendor.scss`.
* изображения — в `src/images`.
* любые другие файлы — в `src/resources`.

Полный пример, описывающий установку библиотеки fancybox:

1. Установка:

   ```bash
   npm install --save fancybox
   ```

2. Подключение скриптов в файл `src/js/vendor.js`:

   ```js
   // @include('../../node_modules/fancybox/dist/js/jquery.fancybox.js')
   ```

3. Подключение стилей в файл `src/scss/_vendor.scss`:

   ```scss
   $fancybox-image-url: "../images";

   @import "../../node_modules/fancybox/dist/scss/jquery.fancybox";
   ```

4. Копирование изображений в `src/images`:

   ```text
   project-template
   └── src
       ├── images
       │   ├── blank.gif
       │   ├── fancybox_loading.gif
       │   ├── fancybox_loading@2x.gif
       │   ├── fancybox_overlay.png
       │   ├── fancybox_sprite.png
       │   ├── fancybox_sprite@2x.png
       │   └── ...
       └── ...
   ```

Если библиотека отсутствует в npm, либо её нужно модифицировать, то файлы следует скачать и закинуть в папки `src/js/vendor` и `src/scss/vendor`.

# Работа с изображениями

Изображения следует хранить в папке `src/images`.
При запуске задачи `images` файлы из папки собираются, оптимизируются, и получившийся результат сохраняется в `build/images`.

```text
project-template
├── build
│   └── images
└── src
    ├── images
    └── resources
        └── images
```

Если изображений очень много, либо имеются файлы, обработка которых занимает значительное время, то их необходимо предварительно оптимизировать и сохранить в папке `src/resources/images`:

```text
project-template
└── src
    └── resources
        └── images
```

Оптимизированные изображения можно получить одним из следующих способов:

* Скопировать из `build/images`.
* С помощью графического редактора.
* С помощью онлайн-инструментов ([tinypng.com](https://tinypng.com), [optimizilla.com](http://optimizilla.com/ru/), [compressor.io](https://compressor.io/)).
* С помощью консольных утилит ([optipng](http://optipng.sourceforge.net/), [jpegoptim](https://ruhighload.com/post/Jpegoptim)).

После переноса файлов в `src/resources/images` неоптимизированные версии изображений из папки `src/images` можно удалить.

## Работа с PNG-спрайтами

Работа с PNG-спрайтами строится следующим образом:

1. Берем две версии иконки — обычную и retina (увеличенную в два раза).
   Сохраняем в `src/images/sprites/png`:

   ```text
   project-template
   └── src
       └── images
           └── sprites
               └── png
                   ├── phone.png
                   └── phone@2x.png
   ```

2. Запускаем задачу `pngSprites` (если уже запущен `gulp watch` или `gulp`, то данный шаг можно пропустить):

   ```bash
   gulp pngSprites
   ```

3. Генератор оптимизирует и объединяет иконки в спрайты:

   ```text
   project-template
   └── build
       └── images
           ├── sprites.png
           └── sprites@2x.png
   ```

   На основе предзаданного шаблона `src/scss/_sprites.hbs` генерируется файл `src/scss/_sprites.scss`, содержащий вспомогательную информацию о получившихся спрайтах:

   ```text
   project-template
   └── src
       └── scss
           ├── _sprites.hbs
           └── _sprites.scss
   ```

   Для каждой иконки создается CSS-класс в формате `.sprite-{название_иконки}`.
   В нашем случае получим класс `.sprite-phone`.

   В сборке также содержится ряд SCSS-функций и миксинов для работы со спрайтами.

   `src/scss/functions/_sprites.scss`:

   ```scss
   @function sprite($name, $size: normal)  { /* ... */ }
   @function sprite-width($name, $size: normal)  { /* ... */ }
   @function sprite-height($name, $size: normal)  { /* ... */ }
   @function sprite-image($name, $size: normal)  { /* ... */ }
   @function sprite-x($name, $size: normal)  { /* ... */ }
   @function sprite-y($name, $size: normal)  { /* ... */ }
   @function sprite-total-width($name, $size: normal)  { /* ... */ }
   @function sprite-total-height($name, $size: normal) { /* ... */ }
   ```

   `src/scss/mixins/_srites.scss`:

   ```scss
   @mixin sprite-width($name, $size: normal)  { /* ... */ }
   @mixin sprite-height($name, $size: normal)  { /* ... */ }
   @mixin sprite-background-image($name, $size: normal)  { /* ... */ }
   @mixin sprite-background-position($name, $size: normal)  { /* ... */ }
   @mixin sprite-background-size($name, $size: normal)  { /* ... */ }
   @mixin sprite-background($name, $size: normal)  { /* ... */ }
   @mixin sprite($name)  { /* ... */ }
   ```

4. Полученные спрайты можно использовать в Pug (с помощью классов):

   ```jade
   footer
       a(href="tel:+71234567890")
           span.sprite-phone
           | +7 (123) 456-78-90
   ```

   Или в SCSS (с помощью миксинов):

   ```scss
   footer {
       a {
           &::before {
               @include sprite("phone");

               content: "";
           }
       }
   }
   ```

## Работа с SVG-спрайтами

Принцип работы с SVG-спрайтами:

1. Получаем векторные иконки в формате `.svg` (либо заранее подготовленные, либо экспортируем с помощью редактора).
   Сохраняем в папку `src/images/sprites/svg`:

   ```text
   project-template
   └── src
       └── images
           └── sprites
               └── svg
                   └── phone.svg
   ```

2. Запускаем задачу `svgSprites` (если уже запущен `gulp watch` или `gulp`, то данный шаг можно пропустить):

   ```bash
   gulp svgSprites
   ```

3. Генератор оптимизирует и объединяет иконки в один спрайт:

   ```text
   project-template
   └── build
       └── images
           └── sprites.svg
   ```

   В сборке содержится Pug-миксин для подключения SVG-спрайтов.<br>
   `src/pug/mixins/svg.pug`:

   ```jade
   mixin svg(name)
       svg&attributes(attributes)
           use(xlink:href="/images/sprites.svg#" + name)
   ```

4. Подключаем иконку в Pug:

   ```jade
   footer
       a(href="tel:+71234567890")
           +svg("phone")
           | +7 (123) 456-78-90
   ```

   При необходимости иконку можно стилизовать:

   ```scss
   footer {
       a {
           svg {
               display: inline-block;
               vertical-align: middle;
               width: 30px;
               height: 30px;
               fill: $color-black;
           }
       }
   }
   ```

   Если цвет заливки или обводки не удается изменить с помощью CSS, то необходимо открыть SVG-файл иконки в редакторе и удалить соответствующие атрибуты (`fill`, `stroke`) из кода.

# Работа с шаблонизатором Pug

В сборке используется шаблонизатор [Pug](https://pugjs.org/) (ранее назывался Jade).

Pug предоставляет множество возможностей, упрощающих работу с шаблонами:

* Переменные.
* Циклы.
* Условия.
* Фильтры.
* Наследование шаблонов.
* Миксины.

Шаблоны страниц размещаются в `src`, а дополнительные файлы и миксины в `src/pug`:

```text
project-template
└── src
    ├── pug
    │   ├── mixins
    │   │   └── svg.pug
    │   └── base.pug
    └── index.pug
```

За сборку и преобразование Pug в HTML отвечает задача `pug`:

```bash
gulp pug
```

После выполнения команды в папке `build` появятся HTML-файлы:

```text
project-template
└── build
    └── index.html
```

## Базовый шаблон и создание страниц

В качестве базового шаблона используется `src/pug/base.pug`.

Пример наследования и использования шаблона:

```jade
extends pug/base

block content
    // Содержимое страницы
```

Базовый шаблон определяет блоки (участки кода или место в шаблоне), которые можно изменять и дополнять при наследовании.

### `vars`

Блок `vars` хранит основные настройки шаблона:

* `title` — заголовок страницы (используется в `<title>` и метатегах).

* `description` — описание страницы (используется в метатегах).

* `image` — изображение страницы (используется в метатегах).

* `html` — настройки тега `<html>`:
  * `html.attrs` — объект для задания дополнительных атрибутов.
  * `html.classList` — массив классов.

* `body` — настройки тега `<body>`:
  * `body.attrs` — объект для задания дополнительных атрибутов.
  * `body.classList` — массив классов.

* `meta` — значения метатегов.

* `link` — значения тегов `<link>`.

Пример использования:

```jade
prepend vars
    - title = 'Заголовок'
    - description = 'Описание'
    - image = 'http://example.com/images/image.png'

append vars
    - html.classList.push('page-index')
    - link.icon['16x16'] = 'favicon_16x16.png'
    - link.icon['32x32'] = 'favicon_32x32.png'
```

### `meta`

В блоке `meta` подключаются метатеги.

Пример использования:

```jade
append meta
    meta(name="date" content="mail@example.com")
```

### `links`

В блоке `links` подключаются стили, иконки и прочие ресурсы.

Пример использования:

```jade
append links
    link(rel="stylesheet" href="css/custom.css")
```

### `content`

Блок `content` предназначен для хранения содержимого страницы.

Пример использования:

```jade
block content
    .container
        h1 Заголовок страницы
```

### `scripts`

В блоке `scripts` подключаются скрипты.

Пример использования:

```jade
append scripts
    script(src="js/custom.js")
```

## Правила написания кода и использование линтера

В сборку интегрирован линтер [pug-lint](https://www.npmjs.com/package/pug-lint).
Файл настроек — `.pug-lintrc.json`.
Данный линтер позволяет поддерживать Pug-код в соответствии с заданным регламентом.

Проверка осуществляется с помощью задачи `lintPug`.

Пример использования (`src/index.pug`):

```jade
extends pug/base

append vars
  - html.classList.push('page-index')

block content
  a(href='#').link Ссылка
```

Результаты проверки:

```text
project-template/src/index.pug:7:14
    5|
    6| block content
  > 7|   a(href='#').link Ссылка
--------------------^
    8|

All class literals must be written before any attribute blocks

project-template/src/index.pug:7:5
    5|
    6| block content
  > 7|   a(href='#').link Ссылка
-----------^
    8|

Invalid attribute quote mark found

project-template/src/index.pug:4:1
    2|
    3| append vars
  > 4|   - html.classList.push('page-index')
-------^
    5|
    6| block content
    7|   a(href='#').link Ссылка

Invalid indentation

project-template/src/index.pug:7:1
    5|
    6| block content
  > 7|   a(href='#').link Ссылка
-------^
    8|

Invalid indentation
```

Исправленный код:

```jade
extends pug/base

append vars
    - html.classList.push('page-index')

block content
    a.link(href="#") Ссылка
```

В дополнение к проверкам кода линтером следует придерживаться следующих правил:

* Повторяющиеся участки кода по возможности выносить в отдельные миксины.
* Схожие по структуре страницы выносить в отдельный шаблон и наследоваться от него.

# Работа со стилями

В сборке используется препроцессор [SCSS](http://sass-lang.com/) и PostCSS-плагин [Autoprefixer](https://autoprefixer.github.io/ru/).

Стили размещаются в папке `src/scss`:

```text
project-template
└── src
    └── scss
        ├── functions
        │   └── _sprites.scss
        ├── mixins
        │   ├── _retina.scss
        │   ├── _sprites.scss
        │   └── _triangle.scss
        ├── vendor
        │   └── .keep
        ├── _base.scss
        ├── _fonts.scss
        ├── _functions.scss
        ├── _mixins.scss
        ├── _sprites.hbs
        ├── _sprites.scss
        ├── _variables.scss
        ├── _vendor.scss
        └── main.scss
```

За сборку и преобразование SCSS в CSS отвечает задача `scss`:

```bash
gulp scss
```

После выполнения команды в папке `build/css` появятся файлы `main.css` и `main.css.map`:

```text
project-template
└── build
    └── css
        ├── main.css
        └── main.css.map
```

## Правила написания кода

### БЭМ

Для именования классов рекомендуется использовать [БЭМ-нотацию](https://ru.bem.info/methodology/naming-convention/).

```scss
.block {
    &__element {
        &--modificator {
            // ...
        }
    }
}
```

### Классы состояний

Классы состояний рекомендуется записывать кратко:

```scss
.is-active {
    // ...
}

.is-current {
    // ...
}

.is-open {
    // ...
}

.is-hidden {
    // ...
}
```

### Порядок CSS-свойств

CSS-свойства следует записывать в определенном порядке. Порядок задан в файле `.stylelintrc` (ключ `order/properties-order`).
Проверить правильность порядка свойств можно с помощью линтера:

```bash
gulp lintScss
```

### Переменные

В файл `src/scss/_variables.scss` следует выносить лишь основные переменные:

* `font-family` для шрифтов. Пример:

  ```scss
  $font-family-roboto: Roboto, sans-serif;
  $font-family-pt-serif: PT Serif, serif;
  ```

* Цвета. Пример:

  ```scss
  $color-aqua-deep: #005741;
  $color-black: #000;
  $color-white: #fff;
  ```

  Для именования цветов можно пользоваться [данным сервисом](http://chir.ag/projects/name-that-color/).

Переменные, используемые лишь в одном блоке или компоненте следует записывать в том же файле, где они используются.

### `@mixin` и `@extend`

Повторяющиеся участки кода (20-30 строк и более), отличающиеся лишь значениями, следует выносить в отдельные миксины.

Не рекомендуется использовать директиву `@extend`. Вместо неё следует воспользоваться `@mixin`.

### Вендорные префиксы

В SCSS-коде не должно присутствовать вендорных префиксов. Они автоматически расставляются в процессе сборки.

**Неправильно**:

```scss
input {
    -webkit-transition: border-color 0.3s;
    transition: border-color 0.3s;

    &::-webkit-input-placeholder {
        color: #000;
    }

    &:-moz-placeholder {
        color: #000;
    }

    &::-moz-placeholder {
        color: #000;
    }

    &:-ms-input-placeholder {
        color: #000;
    }

    &::placeholder {
        color: #000;
    }
}
```

**Правильно**:

```scss
input {
    transition: border-color 0.3s;

    &::placeholder {
        color: #000;
    }
}
```

## Использование линтера

В сборку интегрирован линтер [stylelint](https://stylelint.io/).
Файл настроек — `.stylelintrc`.
Данный линтер позволяет поддерживать SCSS-код в соответствии с заданным регламентом.

Проверка осуществляется с помощью задачи `lintScss`:

```bash
gulp lintScss
```

Пример использования:

```scss
.block {
  &__element {
    display: inline-block
  }
  border-radius: 0px;
  height: 30px;
  width:30px;
}
```

Результаты проверки:

```text
2:3     ⚠  Expected indentation of 1 tab (indentation) [stylelint]
3:5     ⚠  Expected indentation of 2 tabs (indentation) [stylelint]
3:25    ⚠  Expected a trailing semicolon (declaration-block-trailing-semicolon) [stylelint]
4:3     ⚠  Expected indentation of 1 tab (indentation) [stylelint]
5:3     ⚠  Expected indentation of 1 tab (indentation) [stylelint]
5:3     ⚠  Expected declaration to come before rule (order/order) [stylelint]
5:3     ⚠  Expected empty line before declaration (declaration-empty-line-before) [stylelint]
5:19    ⚠  Unexpected unit (length-zero-no-unit) [stylelint]
6:3     ⚠  Expected indentation of 1 tab (indentation) [stylelint]
7:3     ⚠  Expected indentation of 1 tab (indentation) [stylelint]
7:3     ⚠  Expected "width" to come before "height" (order/properties-order) [stylelint]
7:9     ⚠  Expected single space after ":" with a single-line declaration (declaration-colon-space-after) [stylelint]
```

Исправленный код:

```scss
.block {
    border-radius: 0;
    width:30px;
    height: 30px;

    &__element {
        display: inline-block
    }
}
```

# Работа со скриптами

Скрипты размещаются в папке `src/js`:

```text
project-template
└── src
    └── js
        ├── vendor
        │   └── .keep
        ├── detect.js
        ├── globals.js
        ├── main.js
        └── vendor.js
```

За сборку и преобразование JS отвечают задачи `jsMain` и `jsVendor`:

```bash
gulp jsMain jsVendor
```

После выполнения команды в папке `build/js` появятся файлы `main.js` и `vendor.js`:

```text
project-template
└── build
    └── js
        ├── main.js
        └── vendor.js
```

Обработкой скриптов занимаются следующие библиотеки:

* [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)
* [gulp-babel](https://www.npmjs.com/package/gulp-babel)

[gulp-file-include](https://www.npmjs.com/package/gulp-babel) является упрощенной альтернативой ES6-модулям.
Пример подключения файлов:

```js
// @include('detect.js')
// @include('globals.js')
```

[gulp-babel](https://www.npmjs.com/package/gulp-babel) позволяет задействовать в процессе сборки JavaScript-транспайлер [Babel](https://babeljs.io/).
Таким образом, самые современные возможности JavaScript становятся доступны даже для старых браузеров.

Также дополнительно подключены библиотеки:

* [jQuery](https://jquery.com/)
* [bowser](https://github.com/lancedikson/bowser)

[bowser](https://github.com/lancedikson/bowser) отвечает за определение устройства, браузера и операционной системы пользователя.
В файле `src/js/detect.js` содержится код для автоматической расстановки классов тегу `<html>` на основе полученных значений.
Примеры классов:

* `.is-os-mac`
* `.is-os-windows`
* `.is-os-linux`
* `.is-os-android`
* `.is-os-ios`
* `.is-device-mobile`
* `.is-device-tablet`
* `.is-engine-webkit`
* `.is-engine-blink`
* `.is-engine-gecko`
* `.is-browser-chrome`
* `.is-browser-firefox`
* `.is-browser-ie`
* `.is-browser-safari`

Данные классы можно использовать для стилизации элементов:

```scss
.for-desktop {
    display: block;

    .is-device-mobile & {
        display: none;
    }
}
```

## Правила написания кода

### Глобальные переменные

Глобальные переменные следует выносить в файл `src/js/globals.js`.

### Короткие именна переменных

Не следует сокращать имена переменных.

**Неправильно**:

```js
$('.elements').each((i, e) => {
    // ...
});
```

**Правильно**:

```js
$('.elements').each((index, element) => {
    // ...
});
```

Исключение могут составить имена счетчиков в цикле (`i`, `j`, `k`):

```js
for (let i = 0; i < 10; i++) {
    // ...
}
```

### Именование jQuery-переменных

Название переменных, являющихся jQuery-объектами, следует начинать с `$`.

**Неправильно**:

```js
let element = $('.element');
```

**Правильно**:

```js
let $element = $('.element');
```

### jQuery-селекторы

Следует избегать дублирования jQuery-селекторов.
Если обращение к элементу происходит многократно, то jQuery-объект можно сохранить в отдельную переменную, либо переписать код так, чтобы избежать дублирования.

**Неправильно**:

```js
$('.element').on('click', () => {
    // ...
});

$('.element').on('mouseenter', () => {
    // ...
});
```

**Правильно**:

```js
let $element = $('.element');

$element.on('click', () => {
    // ...
});

$element.on('mouseenter', () => {
    // ...
});
```

Или так:

```js
$('.element')
    .on('click', () => {
        // ...
    })
    .on('mouseenter', () => {
        // ...
    });
```

### Обработка событий с помощью jQuery

Для создания обработчика событий следует использовать функцию [`.on()`](http://api.jquery.com/on/).

**Неправильно**:

```js
$('button').click(() => {
    // ...
});

$('form').submit(() => {
    // ...
});
```

**Правильно**:

```js
$('button').on('click', () => {
    // ...
});

$('form').on('submit', () => {
    // ...
});
```

## Использование линтера

В сборку интегрирован линтер [ESLint](http://eslint.org/).
Файл настроек — `.eslintrc`.
Данный линтер позволяет поддерживать JavaScript-код в соответствии с заданным регламентом.

Проверка осуществляется с помощью задачи `lintJs`:

```bash
gulp lintJs
```

Пример использования:

```js
var $form = $('.form')
$form.on("submit", function () {
  $.post('ajax.php', function (data) {
    $(".result").html(data);
  })
})
```

Результаты проверки:

```text
  1:1   error    Expected blank line after variable declarations    newline-after-var
  1:1   error    Unexpected var, use let or const instead           no-var
  1:23  error    Missing semicolon                                  semi
  2:10  error    Strings must use singlequote                       quotes
  2:20  error    Unexpected function expression                     prefer-arrow-callback
  2:20  warning  Unexpected unnamed function                        func-names
  3:1   error    Expected indentation of 1 tab but found 2 spaces   indent
  3:22  warning  Unexpected unnamed function                        func-names
  3:22  error    Unexpected function expression                     prefer-arrow-callback
  4:1   error    Expected indentation of 2 tabs but found 4 spaces  indent
  4:7   error    Strings must use singlequote                       quotes
  5:1   error    Expected indentation of 1 tab but found 2 spaces   indent
  5:5   error    Missing semicolon                                  semi
  6:3   error    Missing semicolon                                  semi

✖ 14 problems (12 errors, 2 warnings)
  12 errors, 0 warnings potentially fixable with the `--fix` option.
```

ESlint сообщает о 14 найденных ошибках, причем большая часть из них может быть исправлена автоматически.
За это отвечает ключ `--fix`, который можно указать при запуске задачи `lintJs`:

```bash
gulp lintJs --fix
```

Исправленный код:

```js
let $form = $('.form');

$form.on('submit', () => {
    $.post('ajax.php', (data) => {
        $('.result').html(data);
    });
});
```
