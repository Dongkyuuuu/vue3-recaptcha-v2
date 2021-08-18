import path from "path";
import alias from "@rollup/plugin-alias";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import vuePlugin from "rollup-plugin-vue";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/vue3-recaptcha-v2.js",
      format: "esm",
      globals: { vue: "Vue" },
    },
  ],
  external: ["vue"],
  plugins: [
    alias({
      entries: [{ find: "@", replacement: path.resolve(__dirname, "src/") }],
    }),
    nodeResolve({
      extensions: [".ts", ".tsx", ".js", ".json", ".vue"],
      modules: [path.resolve(__dirname, "./"), "node_modules"],
    }),
    typescript({
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: false,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["node_modules", ".yarn", "__tests__"],
    }),
    vuePlugin(),
    terser(),
  ],
};
