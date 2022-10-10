const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');

const uglify = require('gulp-uglify');

// Compilando o sass, ad  icionando autoprefixed e dando refresh na página
function compilaSass() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

// Concatenando os arquivos JS
function gulpJs() {
  return gulp.src('js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

// Tarefa de Concatenação JS
gulp.task('alljs', gulpJs);

// Tarefa do SASS
gulp.task('sass', compilaSass);

// Função do BrowserSync
function browser() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}

// Tarefa do BrowserSync
gulp.task('browser-sync', browser)

// Função do Watch para alterações em SCSS e HTML
function watch() {
  gulp.watch('scss/*.scss', compilaSass);
  gulp.watch('*.html').on('change', browserSync.reload);

  gulp.watch('js/scripts/*.js', gulpJs);
}

// Tarefa do Watch
gulp.task('watch', watch);

// Tarefas Default que executa o Satch e o BrowserSync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'alljs'));
