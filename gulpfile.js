const { src, dest, watch, series, parallel } = require('gulp');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const livereload = require('gulp-livereload');
const files = {
    templatesPath: '*.pug',
    stylesPath: '*.styl'
}

function templates() {
	return src(files.templatesPath)
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(dest('.'))
		.pipe(livereload({
			quiet: true
		}));
}

function styles() {
	return src(files.stylesPath)
		.pipe(stylus({
			compress: true
		}))
		.pipe(dest('.'))
		.pipe(livereload({
			quiet: true
		}));
}

function watchTask() {
	livereload.listen();
	watch(
		[files.templatesPath, files.stylesPath],
		parallel(templates, styles)
	);
}


exports.default = series(parallel(templates, styles), watchTask);
