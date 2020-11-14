const { src, dest, watch, series, parallel } = require('gulp');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const livereload = require('gulp-livereload');
const files = {
    demoStylusPath: 'src/notion-enhancer-tweaks-demo.styl',
    demoPugPath: 'src/index.pug',
    stylesPath: 'src/notion-enhancer-tweaks.styl'
}

function styles() {
	return src(files.stylesPath)
		.pipe(stylus({
			compress: false
		}))
		.pipe(dest('.'));
}

function demo() {
	return src(files.demoPugPath)
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(dest('demo'))
		.pipe(livereload({
			quiet: true
		})),
	src(files.demoStylusPath)
		.pipe(stylus({
			compress: false
		}))
		.pipe(dest('demo'))
		.pipe(livereload({
			quiet: true
		}));
}

function watchTask() {
	livereload.listen();
	watch(
		[files.demoStylusPath, files.demoPugPath, files.stylesPath],
		parallel(demo, styles)
	);
}


exports.default = series(parallel(demo, styles), watchTask);
