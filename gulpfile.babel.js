import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {setup as emittySetup} from 'emitty';
import path from 'path';
import pkg from './package.json';
import yargs from 'yargs';

let argv = yargs.default({
	cache: true,
	debug: true,
	fix: false,
	minify: true,
	notify: true,
	open: true,
	port: 3000,
	spa: false,
	throwErrors: false,
}).argv;

let $ = gulpLoadPlugins({
	overridePattern: false,
	pattern: [
		'autoprefixer',
		'browser-sync',
		'connect-history-api-fallback',
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

let errorHandler;

if (argv.throwErrors) {
	errorHandler = false;
} else if (argv.notify) {
	errorHandler = $.notify.onError('<%= error.message %>');
} else {
	errorHandler = null;
}

let emittyPug = emittySetup('src', 'pug', {
	makeVinylFile: true,
});

// eslint-disable-next-line arrow-body-style
let svgoConfig = (minify = argv.minify) => {
	return (file) => {
		let filename = path.basename(file.relative, path.extname(file.relative));

		return {
			js2svg: {
				pretty: !minify,
				indent: '\t',
			},
			plugins: [
				{
					cleanupIDs: {
						minify: true,
						prefix: `${filename}-`,
					},
				},
				{
					removeTitle: true,
				},
				{
					sortAttrs: true,
				},
			],
		};
	};
};

export function copy() {
	return gulp.src([
		'src/resources/**/*.*',
		'src/resources/**/.*',
		'!src/resources/**/.keep',
	], {
		base: 'src/resources',
		dot: true,
	})
		.pipe($.if(argv.cache, $.newer('build')))
		.pipe($.if(argv.debug, $.debug()))
		.pipe(gulp.dest('build'));
}

export function images() {
	return gulp.src('src/images/**/*.*')
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
			$.imagemin.svgo(svgoConfig()),
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
		.pipe($.svgmin(svgoConfig()))
		.pipe($.svgstore())
		.pipe($.if(!argv.minify, $.replace(/^\t+$/gm, '')))
		.pipe($.if(!argv.minify, $.replace(/\n{2,}/g, '\n')))
		.pipe($.if(!argv.minify, $.replace('?><!', '?>\n<!')))
		.pipe($.if(!argv.minify, $.replace('><svg', '>\n<svg')))
		.pipe($.if(!argv.minify, $.replace('><defs', '>\n\t<defs')))
		.pipe($.if(!argv.minify, $.replace('><symbol', '>\n<symbol')))
		.pipe($.if(!argv.minify, $.replace('></svg', '>\n</svg')))
		.pipe($.rename('sprites.svg'))
		.pipe(gulp.dest('build/images'));
}

export function svgOptimize() {
	return gulp.src('src/images/**/*.svg', {
		base: 'src/images',
	})
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.svgmin(svgoConfig(false)))
		.pipe(gulp.dest('src/images'));
}

export function jsMain() {
	return gulp.src('src/js/main.js')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.fileInclude({
			prefix: '// @',
		}))
		.pipe($.babel({
			presets: [
				'es2015',
			],
		}))
		.pipe($.if(argv.minify, $.uglify()))
		.pipe($.if(!argv.minify, $.replace(/\/\* global .+\n?/g, '')))
		.pipe($.if(!argv.minify, $.replace(/\/[*|/] eslint-disable.+\n?/g, '')))
		.pipe($.if(!argv.minify, $.replace(/\/\/ no default\n?/g, '')))
		.pipe($.if(!argv.minify, $.jsbeautifier({
			js: {
				indent_with_tabs: true,
				end_with_newline: true,
				max_preserve_newlines: 2,
			},
		})))
		.pipe(gulp.dest('build/js'));
}

export function jsVendor() {
	return gulp.src('src/js/vendor.js')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.if(argv.cache, $.newer('build/js')))
		.pipe($.fileInclude({
			prefix: '// @',
		}))
		.pipe($.if(argv.minify, $.uglify()))
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
				pretty: argv.minify ? false : '\t',
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
					pretty: argv.minify ? false : '\t',
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
		.pipe($.sourcemaps.init())
		.pipe($.sass().on('error', $.sass.logError))
		.pipe($.postcss([
			argv.minify ?
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
				})
				:
				$.autoprefixer({
					add: true,
					browsers: ['> 0%'],
				}),
		]))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest('build/css'));
}

export function lintJs() {
	return gulp.src([
		'*.js',
		'src/js/**/*.js',
		'!src/js/vendor/**/*.js',
	], {
		base: '.',
	})
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.eslint({
			fix: argv.fix,
		}))
		.pipe($.eslint.format())
		.pipe($.if((file) => file.eslint && file.eslint.fixed, gulp.dest('.')));
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
	return gulp.src([
		'src/scss/**/*.scss',
		'!src/scss/vendor/**/*.scss',
	])
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
	let middleware = [];

	if (argv.spa) {
		middleware.push($.connectHistoryApiFallback());
	}

	$.browserSync
		.create()
		.init({
			notify: false,
			open: argv.open,
			port: argv.port,
			files: [
				'./build/**/*',
			],
			server: {
				baseDir: './build',
				middleware,
			},
		});
}

export function zip() {
	let name = pkg.name;
	let now = new Date();
	let year = now.getFullYear().toString().padStart(2, '0');
	let month = (now.getMonth() + 1).toString().padStart(2, '0');
	let day = now.getDate().toString().padStart(2, '0');
	let hours = now.getHours().toString().padStart(2, '0');
	let minutes = now.getMinutes().toString().padStart(2, '0');

	return gulp.src([
		'build/**',
		'docs/**',
		'src/**',
		'.babelrc',
		'.editorconfig',
		'.eslintignore',
		'.eslintrc',
		'.gitignore',
		'.npmrc',
		'.stylelintrc',
		'*.js',
		'*.json',
		'*.md',
		'*.yml',
		'!zip/**',
	], {
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
