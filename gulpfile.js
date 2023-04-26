import gulp from 'gulp'; // Для підключення Gulp
import htmlmin from 'gulp-htmlmin'; // Для для компілювання та мініфікації HTML

import concat from 'gulp-concat'; // Для об`єднання в один файл(concat) js
import terser from 'gulp-terser'; // Для для компілювання та мініфікації(terser) js

import cleanCSS from 'gulp-clean-css'; // Для для компілювання та мініфікації CSS

import clean from 'gulp-clean'; // Для для  очистки папки dist

import imagemin from 'gulp-imagemin'; // Для для мініфікації картинок компілювання в dist

import autoprefixer from 'gulp-autoprefixer'; // Для для мініфікації картинок компілювання в dist

import bs from 'browser-sync'; // Для підключення browserSync (сервер онлайн), який відслідковує всі зміни та компілює їх
const browserSync = bs.create(); // Для підключення browserSync (сервер онлайн), який відслідковує всі зміни та компілює їх

import dartSass from 'sass'; // Для компілювання і поєднання в  1 файл всіх файлів SCSS в CSS
import gulpSass from 'gulp-sass'; // Для компілювання і поєднання в  1 файл всіх файлів SCSS в CSS
const sass = gulpSass(dartSass);  // Для компілювання і поєднання в  1 файл всіх файлів SCSS в CSS


// Для компілювання та мініфікації CSS і поєднання в  1 файл CSS всіх файлів SCSS 
const scss = () => {
    return gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        cascade: false}))
      .pipe(concat('styles.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./dist/css'));
};

// Для для  очистки папки dist
const cleanDist = () => {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
}

// Для для мініфікації картинок компілювання в dist
const imgMin  = () => {
    return gulp.src('src/img/**/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
}

const imgMinPng  = () => {
    return gulp.src('src/img/**/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
}

const imgMinSvg  = () => {
    return gulp.src('src/img/**/*.svg')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
}

// Для для компілювання та мініфікації HTML
const html = () => {
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
}

// Для для компілювання та Fonts
const fonts = () => {
    return gulp.src('./src/**/*.woff')
        .pipe(gulp.dest('./dist'))
}


// Для для компілювання та мініфікації(terser) та  обєднання в один  файл(concat) js
const js = () => {
    return gulp.src('./src/js**/*.js')
        .pipe(concat('scripts.min.js'))
        .pipe(terser({
            keep_fnames: true,
            mangle: false
        }))
        .pipe(gulp.dest('./dist/js'))
}

// Для підключення browserSync (сервер онлайн), який відслідковує (watch) всі зміни та компілює їх
const dev = () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./src/**/*', gulp.series(cleanDist, gulp.parallel(js, scss, imgMin, imgMinSvg,imgMinPng, fonts), (next) => { 
        browserSync.reload(); 
        next();
    }))
}


// Для підключення task
// gulp.task('img', imgMin);
// gulp.task('scss', scss);

// Для підключення task - gulp build - запускає серійно все при цьому парраленльно запускаються (частина файлів: html, js, css, scss, imgMin)
gulp.task('build', gulp.series(cleanDist, gulp.parallel(js, scss, imgMin, imgMinSvg, imgMinPng, fonts)));

// Для підключення task - gulp dev - Для підключення browserSync (сервер онлайн)
gulp.task('dev', gulp.series('build', dev));

gulp.task('cleanDist', cleanDist)

gulp.task('js', js)
















