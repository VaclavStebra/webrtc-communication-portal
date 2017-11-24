import gulp from 'gulp';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import sequence from 'run-sequence';
import del from 'del';

import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import global from 'rollup-plugin-node-globals';

import BUILD_CONFIG from './config/build';

gulp.task('react', () => {
    return rollup({
        input: BUILD_CONFIG.rollup.input,
        plugins: [
            babel(BUILD_CONFIG.rollup.babel),
            commonJs(BUILD_CONFIG.rollup.commonJs),
            nodeResolve(BUILD_CONFIG.rollup.nodeResolve),
            global()
        ]
    }).then((bundle) => {
        return bundle.write(BUILD_CONFIG.rollup.bundle);
    });
});

gulp.task('style', () => {
    return gulp.src(BUILD_CONFIG.styles.input)
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(concat(BUILD_CONFIG.styles.fileName))
        .pipe(gulp.dest(BUILD_CONFIG.dist_dir));
});

gulp.task('app', () => {
   return gulp.src(BUILD_CONFIG.app.input)
       .pipe(gulp.dest(BUILD_CONFIG.dist_dir));
});

gulp.task('clean', () => {
    return del([
        BUILD_CONFIG.dist_dir
    ]);
});

gulp.task('watch', () => {
    for (const path of BUILD_CONFIG.watch.paths) {
        gulp.watch(path.glob, BUILD_CONFIG.watch.options, path.tasks)
    }
});

gulp.task('default', () => {
    return sequence(
        'clean',
        ['react', 'style', 'app'],
        'watch'
    );
});

gulp.task('build', () => {
    return sequence(
        'clean',
        ['react', 'style', 'app']
    );
});