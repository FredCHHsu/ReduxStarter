// reference
// https://github.com/kriasoft/react-starter-kit/blob/88eabc907aa0f3f8be6a00663f265cbc94262276/gulpfile.js#L114-L141
// http://drewbarontini.com/articles/building-a-better-gulpfile/
//
//
// -------------------------------------
// Gulp Modules that I haven't try
// -------------------------------------
// gulp-autoprefixer : Prefix CSS
// gulp-concat       : Concatenate files
// gulp-csscss       : CSS redundancy analyzer
// gulp-jshint       : JavaScript code quality tool
// gulp-load-plugins : Automatically load Gulp plugins
// gulp-minify-css   : Minify CSS
// gulp-parker       : Stylesheet analysis tool
// gulp-plumber      : Prevent pipe breaking from errors
// gulp-rename       : Rename files
// gulp-svgmin       : Minify SVG files
// gulp-svgstore     : Combine SVG files into one
// gulp-uglify       : Minify JavaScript with UglifyJS
// gulp-watch        : Watch stream
// -------------------------------------


// Modules loading by gulp-load-plugins
// -------------------------------------
// gulp-htmlmin      : Minify HTML
// gulp-sass         : Compile Sass
// gulp-sourcemaps   : Source map support
// gulp-postcss      : Pipe CSS through PostCSS processors
// gulp-util         : Utility functions
// gulp-if           : if functions
// -------------------------------------

// require gulp and related tools
// ===========================================
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence'); // Run a series of dependent Gulp tasks in order
const browserSync = require('browser-sync');
const argv = require('minimist')(process.argv.slice(2));

// require webpack
// ===========================================
// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config.js');

// require sass and postcss
// ===========================================
// Before-SASS processors
const scssSyntax = require('postcss-scss');
const doiuse = require('doiuse');
const reporter = require('postcss-reporter');
// After-SASS processors
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


// settings
// ===========================================
// URL const
const webpackDevServerUrl = 'http://localhost:8080/'; // equal to webpack entry
const DEST = './public';
const RELEASE = !!argv.release;
const AUTOPREFIXER_BROWSERS = [
  '> 5%',
  'last 2 version',
];
const src = {};
let watch = false;
const reload = browserSync.reload;
const stream = browserSync.stream;


// default task
// ===========================================
gulp.task('default', ['serve']);

// HTML pages
// ===========================================
gulp.task('pages', () => {
  src.pages = 'src/**/*.html';
  return gulp.src(src.pages)
    .pipe($.if(RELEASE, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true,
    })))
    .pipe(gulp.dest(DEST))
    .pipe($.if(watch, stream()));
});

// Assets
// ===========================================
gulp.task('assets', () => {
  src.assets = 'assets/**/*';
  return gulp.src(src.assets)
    .pipe(gulp.dest(DEST));
});

// Compile SASS
// ===========================================
const preSASSProcessors = [
  doiuse({ browsers: AUTOPREFIXER_BROWSERS }),
  reporter({ clearMessages: true }),
];
const afterSASSProcessors = [
  autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }),
];
const afterProcessorsProduction = [
  autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }),
  cssnano(),
];

// PostCSS before Sass compilation
gulp.task('before-sass', () => {
  src.styles = 'styles/**/*.{css,scss}';
  return gulp.src(src.styles)
  .pipe($.postcss(preSASSProcessors, { syntax: scssSyntax }));
});

// Sass compilation with PostCSS
gulp.task('sass', () =>
  gulp.src('styles/style.scss')
  .pipe($.sourcemaps.init())
  .pipe($.sass({
    includePaths: ['./node_modules/susy/sass/'],
  }).on('error', $.sass.logError))
  .pipe($.postcss(afterSASSProcessors))
  .pipe($.sourcemaps.write('./')) // relative to the dest path for seperated map file
  .pipe(gulp.dest(`${DEST}/css`))
  // Prevent reload full page by update sourcemap
  .pipe($.if(watch, stream({ match: '**/*.css' })))
);

// Build css production
gulp.task('sass-production', () =>
  gulp.src('styles/style.scss')
  .pipe($.sourcemaps.init())
  .pipe($.sass({
    includePaths: ['./node_modules/susy/sass/'],
  }).on('error', $.sass.logError))
  .pipe($.postcss(afterProcessorsProduction))
  .pipe($.sourcemaps.write('./')) // relative to the dest path for seperated map file
  .pipe(gulp.dest(`${DEST}/css`))
);

// Build js Bundle Using Webpack
// ===========================================
// gulp.task('bundle', (cb) => {
//   let started = false;
//   const config = webpackConfig(RELEASE);
//   const bundler = webpack(config);
//
//   function bundle (err, stats) {
//     if (err) {
//       throw new $.util.PluginError('webpack', err);
//     }
//
//     !!argv.verbose && $.util.log('[webpack]', stats.toString({colors: true}));
//
//     if (watch) {
//       reload(config.output.filename);
//     }
//
//     if (!started) {
//       started = true;
//       return cb();
//     }
//   }
//
//   if (watch) {
//     bundler.watch(200, bundle);
//   } else {
//     bundler.run(bundle);
//   }
// });

// Build the app from source code
// ===========================================
gulp.task('build', (cb) => {
  // runSequence(['pages', 'before-sass', 'sass', 'bundle'], cb);
  runSequence(['pages', 'assets', 'sass-production'], cb);
});

// Launch a lightweight HTTP Server
// ===========================================
gulp.task('serve', (cb) => {
  watch = true;
  runSequence(['pages', 'assets', 'sass'], () => {
    browserSync({
      notify: true,
      // Run as an https by uncommenting 'https: true'
      // Note: this uses an unsigned certificate which on first access
      //       will present a certificate warning in the browser.
      // https: true,
      // server: {
      //   baseDir: ['public'],
      // },
      proxy: { target: webpackDevServerUrl },
    });

    // gulp.watch(src.assets, ['assets']);
    // gulp.watch(src.images, ['images']);
    gulp.watch(src.pages, ['pages']);
    gulp.watch(src.styles, ['before-sass', 'sass']);
    cb();
  });
});

