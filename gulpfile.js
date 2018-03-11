let gulp = require('gulp');
let gulpLoadPlugins = require('gulp-load-plugins');
let yargs = require('yargs');

let path;
let emittyPug;
let errorHandler;

let argv = yargs.default({
	cache: true,
	debug: true,
	fix: false,
	minify: false,
	minifyHtml: null,
	minifyCss: null,
	minifyJs: null,
	minifySvg: null,
	notify: true,
	open: true,
	port: 3000,
	spa: false,
	throwErrors: false,
}).argv;

argv.minify = !!argv.minify;
argv.minifyHtml = argv.minifyHtml !== null ? !!argv.minifyHtml : argv.minify;
argv.minifyCss = argv.minifyCss !== null ? !!argv.minifyCss : argv.minify;
argv.minifyJs = argv.minifyJs !== null ? !!argv.minifyJs : argv.minify;
argv.minifySvg = argv.minifySvg !== null ? !!argv.minifySvg : argv.minify;

let $ = gulpLoadPlugins({
	overridePattern: false,
	pattern: [
		'autoprefixer',
		'browser-sync',
		'connect-history-api-fallback',
		'cssnano',
		'emitty',
		'merge-stream',
		'postcss-reporter',
		'postcss-scss',
		'stylelint',
		'uglifyjs-webpack-plugin',
		'vinyl-buffer',
		'webpack',
		'webpack-stream',
	],
	scope: [
		'dependencies',
		'devDependencies',
		'optionalDependencies',
		'peerDependencies',
	],
});

if (argv.throwErrors) {
	errorHandler = false;
} else if (argv.notify) {
	errorHandler = $.notify.onError('<%= error.message %>');
} else {
	errorHandler = null;
}

function svgoConfig(minify = argv.minifySvg) {
	return (file) => {
		if (!path) {
			// eslint-disable-next-line global-require
			path = require('path');
		}

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
}

gulp.task('copy', () => {
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
});

gulp.task('images', () => {
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
});

gulp.task('pngSprites', () => {
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
});

gulp.task('svgSprites', () => {
	return gulp.src('src/images/sprites/svg/*.svg')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.svgmin(svgoConfig()))
		.pipe($.svgstore())
		.pipe($.if(!argv.minifySvg, $.replace(/^\t+$/gm, '')))
		.pipe($.if(!argv.minifySvg, $.replace(/\n{2,}/g, '\n')))
		.pipe($.if(!argv.minifySvg, $.replace('?><!', '?>\n<!')))
		.pipe($.if(!argv.minifySvg, $.replace('><svg', '>\n<svg')))
		.pipe($.if(!argv.minifySvg, $.replace('><defs', '>\n\t<defs')))
		.pipe($.if(!argv.minifySvg, $.replace('><symbol', '>\n<symbol')))
		.pipe($.if(!argv.minifySvg, $.replace('></svg', '>\n</svg')))
		.pipe($.rename('sprites.svg'))
		.pipe(gulp.dest('build/images'));
});

gulp.task('svgOptimize', () => {
	return gulp.src('src/images/**/*.svg', {
		base: 'src/images',
	})
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.if(argv.debug, $.debug()))
		.pipe($.svgmin(svgoConfig(false)))
		.pipe(gulp.dest('src/images'));
});

gulp.task('pug', () => {
	if (!emittyPug) {
		emittyPug = $.emitty.setup('src', 'pug', {
			makeVinylFile: true,
		});
	}

	if (!argv.cache) {
		return gulp.src('src/*.pug')
			.pipe($.plumber({
				errorHandler,
			}))
			.pipe($.if(argv.debug, $.debug()))
			.pipe($.pug({
				pretty: argv.minifyHtml ? false : '\t',
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
					pretty: argv.minifyHtml ? false : '\t',
				}))
				.pipe(gulp.dest('build'))
				.on('end', resolve)
				.on('error', reject);
		});
	});
});

gulp.task('scss', () => {
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
			argv.minifyCss ?
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
});

gulp.task('js', () => {
	let plugins = [
		new $.webpackStream.webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks(module) {
				return module.context && module.context.includes('node_modules');
			},
		}),
	];

	if (argv.minifyJs) {
		// eslint-disable-next-line new-cap
		plugins.push(new $.uglifyjsWebpackPlugin({
			cache: true,
			parallel: true,
			sourceMap: true,
		}));
	}

	return gulp.src('src/js/main.js')
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.webpackStream({
			devtool: 'source-map',
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [
									'babel-preset-env',
								],
								plugins: [
									'babel-plugin-transform-runtime',
								],
							},
						},
					},
				],
			},
			plugins,
			output: {
				filename: '[name].js',
			},
		}))
		.pipe(gulp.dest('build/js'));
});

gulp.task('lintPug', () => {
	return gulp.src([
		'src/*.pug',
		'src/pug/**/*.pug',
	])
		.pipe($.plumber({
			errorHandler,
		}))
		.pipe($.pugLinter())
		.pipe($.pugLinter.reporter(argv.throwErrors ? 'fail' : null));
});

gulp.task('lintScss', () => {
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
});

gulp.task('lintJs', () => {
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
});

gulp.task('watch', () => {
	gulp.watch([
		'src/resources/**/*.*',
		'src/resources/**/.*',
	], gulp.series('copy'));

	gulp.watch('src/images/**/*.*', gulp.series('images'));

	gulp.watch([
		'src/images/sprites/png/*.png',
		'src/scss/_sprites.hbs',
	], gulp.series('pngSprites'));

	gulp.watch('src/images/sprites/svg/*.svg', gulp.series('svgSprites'));

	gulp.watch([
		'src/*.pug',
		'src/pug/**/*.pug',
	], {
		delay: 0,
	}, gulp.series('pug'))
		.on('all', (event, file) => {
			if (event === 'unlink') {
				global.emittyPugChangedFile = undefined;
			} else {
				global.emittyPugChangedFile = file;
			}
		});

	gulp.watch('src/scss/**/*.scss', gulp.series('scss'));

	gulp.watch('src/js/**/*.js', gulp.series('js'));
});

gulp.task('serve', () => {
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
});

gulp.task('zip', () => {
	// eslint-disable-next-line global-require
	let name = require('./package').name;
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
});

gulp.task('build', gulp.parallel(
	'copy',
	'images',
	'pngSprites',
	'svgSprites',
	'pug',
	'scss',
	'js'
));

gulp.task('lint', gulp.series(
	'lintPug',
	'lintScss',
	'lintJs'
));

gulp.task('default', gulp.series(
	'build',
	gulp.parallel(
		'watch',
		'serve'
	)
));
