import yargs from 'yargs';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {setup as emittySetup} from 'emitty';

let argv = yargs.default({
	cache: true,
	debug: true,
	htmlExt: true,
	production: false,
	sourcemaps: true,
	throwErrors: false,
}).argv;

let $ = gulpLoadPlugins({
	overridePattern: false,
	pattern: [
		'browser-sync',
		'cssnano',
		'merge-stream',
		'postcss-reporter',
		'postcss-scss',
		'stylelint',
		'vinyl-buffer',
	],
	scope: [
		'dependencies',
		'devDependencies',
		'optionalDependencies',
		'peerDependencies',
	],
});

let errorHandler = argv.throwErrors ? false : null;

let emittyPug = emittySetup('src', 'pug', {
	makeVinylFile: true,
});

export function copy() {
	return gulp.src([
		'src/resources/**/*.*',
		'src/resources/**/.*',
	], {
		allowEmpty: true,
		base: 'src/resources',
		dot: true,
		since: gulp.lastRun('copy'),
	})
		.pipe($.if(argv.cache, $.newer('build')))
		.pipe($.if(argv.debug, $.debug()))
		.pipe(gulp.dest('build'));
}

export function images() {
	return gulp.src('src/images/**/*.*', {
		sins: gulp.lastRun('images'),
	})
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.cache, $.newer('build/images')))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.imagemin([
			$.imagemin.gifsicle({
				interlaced: true,
			}),
			$.imagemin.jpegtran({
				progressive: true,
			}),
			$.imagemin.optipng({
				optimizationLevel: 3,
			}),
			$.imagemin.svgo(),
		]))
		.pipe(gulp.dest('build/images'));
}

export function pngSprites() {
	const spritesData = gulp.src('src/images/sprites/png/*.png')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.spritesmith({
			cssName: '_sprites.scss',
			cssTemplate: 'src/scss/_sprites.hbs',
			imgName: 'sprites.png',
			retinaImgName: 'sprites@2x.png',
			retinaSrcFilter: 'src/images/sprites/png/*@2x.png',
			padding: 2,
		}));

	return $.mergeStream(
		spritesData.img
			.pipe($.plumber({
				errorHandler,
			}))
			.pipe($.vinylBuffer())
			.pipe($.imagemin())
			.pipe(gulp.dest('build/images')),
		spritesData.css
			.pipe(gulp.dest('src/scss'))
	);
}

export function svgSprites() {
	return gulp.src('src/images/sprites/svg/*.svg')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.svgmin({
			js2svg: {
				pretty: !argv.production,
			},
			plugins: [
				{
					cleanupIDs: false,
				},
			],
		}))
		.pipe($.svgstore())
		.pipe($.if(!argv.production, $.replace('?><!', '?>\n<!')))
		.pipe($.if(!argv.production, $.replace('><svg', '>\n<svg')))
		.pipe($.if(!argv.production, $.replace('><symbol', '>\n<symbol')))
		.pipe($.if(!argv.production, $.replace('></svg', '>\n</svg')))
		.pipe($.rename('sprites.svg'))
		.pipe(gulp.dest('build/images'));
}

export function jsMain() {
	return gulp.src('src/js/main.js')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.if(argv.sourcemaps, $.sourcemaps.init()))
		.pipe($.fileInclude({
			prefix: '// @',
		}))
		.pipe($.babel({
			presets: [
				'es2015',
			],
		}))
		.pipe($.if(argv.production, $.stripDebug()))
		.pipe($.jsbeautifier({
			js: {
				indent_with_tabs: true,
				end_with_newline: true,
				max_preserve_newlines: 2,
			},
		}))
		.pipe($.if(argv.sourcemaps, $.sourcemaps.write('.')))
		.pipe(gulp.dest('build/js'));
}

export function jsVendor() {
	return gulp.src('src/js/vendor.js', {
		since: gulp.lastRun('jsVendor'),
	})
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.if(argv.cache, $.newer('build/js')))
		.pipe($.if(argv.sourcemaps, $.sourcemaps.init()))
		.pipe($.fileInclude({
			prefix: '// @',
		}))
		.pipe($.uglify())
		.pipe($.if(argv.sourcemaps, $.sourcemaps.write('.')))
		.pipe(gulp.dest('build/js'));
}

export function pug() {
	if (!argv.cache) {
		return gulp.src('src/*.pug')
			.pipe($.plumber({
				errorHandler,
			}))
			.pipe($.if(argv.debug, $.debug()))
			.pipe($.pug({
				pretty: true,
			}))
			.pipe(gulp.dest('build'));
	}

	return new Promise((resolve, reject) => {
		emittyPug.scan(global.emittyPugChangedFile).then(() => {
			gulp.src('src/*.pug')
				.pipe($.plumber({
					errorHandler,
				}))
				.pipe(emittyPug.filter(global.emittyPugChangedFile))
				.pipe($.if(argv.debug, $.debug()))
				.pipe($.pug({
					pretty: true,
				}))
				.pipe(gulp.dest('build'))
				.on('end', resolve)
				.on('error', reject);
		});
	});
}

export function scss() {
	return gulp.src([
		'src/scss/*.scss',
		'!src/scss/_*.scss',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.if(argv.sourcemaps, $.sourcemaps.init()))
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.postcss([
			$.cssnano({
				autoprefixer: {
					add: true,
					browsers: ['> 0%'],
				},
				calc: true,
				discardComments: {
					removeAll: true,
				},
				zindex: false,
			}),
		]))
		.pipe($.if(argv.sourcemaps, $.sourcemaps.write('.')))
		.pipe(gulp.dest('build/css'));
}

export function lintJs() {
	return gulp.src([
		'gulpfile.babel.js',
		'src/js/**/*.js',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.eslint())
		.pipe($.eslint.format());
}

export function lintPug() {
	return gulp.src([
		'src/*.pug',
		'src/pug/**/*.pug',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.pugLinter())
		.pipe($.pugLinter.reporter(argv.throwErrors ? 'fail' : null));
}

export function lintScss() {
	return gulp.src('src/scss/**/*.scss')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.postcss([
			$.stylelint(),
			$.postcssReporter({
				clearReportedMessages: true,
				throwError: argv.throwErrors,
			}),
		], {
			parser: $.postcssScss,
		}));
}

export function watch() {
	gulp.watch([
		'src/resources/**/*.*',
		'src/resources/**/.*',
	], copy);

	gulp.watch('src/images/**/*.*', images);

	gulp.watch('src/images/sprites/svg/*.svg', svgSprites);

	gulp.watch([
		'src/images/sprites/png/*.png',
		'src/scss/_sprites.hbs',
	], pngSprites);

	gulp.watch([
		'src/js/**/*.js',
		'!src/js/vendor.js',
	], jsMain);

	gulp.watch('src/js/vendor.js', jsVendor);

	gulp.watch([
		'src/*.pug',
		'src/pug/**/*.pug',
	], {
		delay: 0,
	}, pug)
		.on('all', (event, file) => {
			if (event === 'unlink') {
				global.emittyPugChangedFile = undefined;
			} else {
				global.emittyPugChangedFile = file;
			}
		});

	gulp.watch('src/scss/**/*.scss', scss);
}

export function serve() {
	$.browserSync
		.create()
		.init({
			files: [
				'./build/**/*',
			],
			notify: false,
			server: {
				baseDir: './build',
				serveStaticOptions: {
					extensions: argv.htmlExt ? [] : ['html'],
				},
			},
		});
}

export function zip() {
	// eslint-disable-next-line global-require
	let name = require('./package.json').name;
	let now = new Date();
	let year = now.getFullYear();
	let month = now.getMonth() + 1;
	let day = now.getDate();
	let hours = now.getHours();
	let minutes = now.getMinutes();

	month = month < 10 ? `0${month}` : month;
	day = day < 10 ? `0${day}` : day;
	hours = hours < 10 ? `0${hours}` : hours;
	minutes = minutes < 10 ? `0${minutes}` : minutes;

	return gulp.src([
		'build/**',
		'src/**',
		'.babelrc',
		'.gitignore',
		'.npmrc',
		'*.js',
		'*.json',
		'*.md',
		'*.yml',
		'!zip/**',
	], {
		allowEmpty: true,
		base: '.',
		dot: true,
	})
		.pipe($.zip(`${name}_${year}-${month}-${day}_${hours}-${minutes}.zip`))
		.pipe(gulp.dest('zip'));
}

export const build = gulp.parallel(
	copy,
	images,
	svgSprites,
	pngSprites,
	jsMain,
	jsVendor,
	pug,
	scss
);

export const lint = gulp.series(
	lintJs,
	lintPug,
	lintScss
);

export default gulp.series(
	build,
	gulp.parallel(
		watch,
		serve
	)
);
