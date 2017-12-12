import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

var env = process.env.NODE_ENV
var config = {
  name: 'ReactChloroform',
  external: [
    'react',
  ],
  globals: {
    'react': 'React',
  },
  output: {
    format: 'umd',
  },
  plugins: [
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
      plugins: ['external-helpers']
    }),
    nodeResolve({
      jsnext: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: { './node_module/invariant.js': ['default'] }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
