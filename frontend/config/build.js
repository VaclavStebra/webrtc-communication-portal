const BABEL_CONFIG = {
  exclude: 'node_modules/**',
  presets: [
    'react',
    ['env', { modules: false }]
  ],
  plugins: [
    'external-helpers',
    'transform-object-rest-spread'
  ],
  babelrc: false
};

const COMON_JS_CONFIG = {
  include: [
    'node_modules/**'
  ],
  namedExports: {
    'node_modules/react/index.js': ['Children', 'Component', 'createElement']
  }
};

const NODE_RESOLVE_CONFIG = {
  module: true,
  main: true,
  jsnext: true,
  browser: true,
  extensions: ['.js', '.jsx']
};

const BUNDLE_CONFIG = {
  name: 'WebRTCCommunicationPortal',
  format: 'iife',
  file: 'dist/app.js'
};

const BUILD_CONFIG = {
  dist_dir: 'dist/',
  rollup: {
    input: 'src/app.js',
    babel: BABEL_CONFIG,
    bundle: BUNDLE_CONFIG,
    commonJs: COMON_JS_CONFIG,
    nodeResolve: NODE_RESOLVE_CONFIG
  },
  styles: {
    input: 'src/styles/app.scss',
    fileName: 'app.css'
  },
  app: {
    input: 'src/index.html'
  },
  watch: {
    options: {
      debounceDelay: 1000
    },
    paths: [
      {
        glob: 'src/app.js',
        tasks: ['react']
      },
      {
        glob: 'src/constants/**/*.js',
        tasks: ['react']
      },
      {
        glob: 'src/modules/**/*.jsx',
        tasks: ['react']
      },
      {
        glob: 'src/modules/**/*.js',
        tasks: ['react']
      },
      {
        glob: 'src/reducers/**/*.js',
        tasks: ['react']
      },
      {
        glob: 'src/stores/**/*.js',
        tasks: ['react']
      },
      {
        glob: 'src/utils/**/*.js',
        tasks: ['react']
      },
      {
        glob: 'src/styles/**/*.scss',
        tasks: ['style']
      },
      {
        glob: 'src/index.html',
        tasks: ['app']
      }
    ]
  }
};


export default BUILD_CONFIG;
