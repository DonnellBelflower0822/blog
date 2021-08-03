import babel from 'rollup-plugin-babel'
import path from 'path'
import nodeResolve from 'rollup-plugin-node-resolve'
import ts from 'rollup-plugin-typescript2'

export default {
  input: './src/index.ts',
  output: {
    format: 'umd',
    name: 'Vue',
    file: 'dist/vue.js',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    ts({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    nodeResolve()
  ]
}