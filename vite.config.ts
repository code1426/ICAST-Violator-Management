import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

// package.json
// "@journeyapps/wa-sqlite": "^0.4.1",
//     "@powersync/kysely-driver": "^0.4.2",
//     "@powersync/react": "^1.5.0",
//     "@powersync/web": "^1.9.1",
// "vite-plugin-top-level-await": "^1.4.4",
    // "vite-plugin-wasm": "^3.3.0"



// import wasm from "vite-plugin-wasm";
// import topLevelAwait from "vite-plugin-top-level-await";
// import { defineConfig } from "vite";

// // https://vitejs.dev/config/
// export default defineConfig({
//   root: "src",
//   build: {
//     outDir: "../dist",
//     rollupOptions: {
//       input: "../index.html",
//     },
//     emptyOutDir: true,
//   },
//   envDir: "..", // Use this dir for env vars, not 'src'.
//   optimizeDeps: {
//     // Don't optimize these packages as they contain web workers and WASM files.
//     // https://github.com/vitejs/vite/issues/11672#issuecomment-1415820673
//     exclude: ["@journeyapps/wa-sqlite", "@powersync/web"],
//     include: ["@powersync/web > js-logger"],
//     // include: []
//   },
//   plugins: [wasm(), topLevelAwait()],
//   worker: {
//     format: "es",
//     plugins: () => [wasm(), topLevelAwait()],
//   },
// });
