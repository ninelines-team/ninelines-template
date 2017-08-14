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

TODO

## Использование линтера

TODO
