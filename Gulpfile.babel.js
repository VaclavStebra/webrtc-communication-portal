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

gulp.task('react', () => {
    return rollup({
        input: 'src/app.js',
        plugins: [
            babel({
                exclude: 'node_modules/**',
                presets: [
                    'react',
                    ['env', { modules: false }]
                ],
                plugins: [
                    'external-helpers'
                ],
                babelrc: false
            }),
            commonJs({
                include: [
                    'node_modules/**'
                ]
            }),
            nodeResolve({
                module: true,
                main: true,
                jsnext: true,
                browser: true,
                extensions: ['.js', '.jsx']
            }),
            global()
        ]
    }).then((bundle) => {
        return bundle.write({
            name: 'MedicomTestApp',
            format: 'iife',
            file: 'dist/app.js'
        });
    });
});

gulp.task('style', () => {
    return gulp.src('src/styles/app.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('app', () => {
   return gulp.src('src/index.html')
       .pipe(gulp.dest('dist/'));
});

gulp.task('clean', () => {
    return del([
        'dist/'
    ]);
});

gulp.task('watch', () => {
    const options = {
        debounceDelay: 1000
    };

    gulp.watch('src/components/**/*.jsx', options, ['react']);
    gulp.watch('src/styles/**/*.scss', options, ['style']);
    gulp.watch('src/index.html', options, ['app']);
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