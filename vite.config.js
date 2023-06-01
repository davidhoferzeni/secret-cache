import dts from "vite-plugin-dts";

export default {
  root: "src",
  build: {
    target: "esnext",
    outDir: "../dist",
  },
  plugins: [dts({ tsConfigFilePath: "../tsconfig.json" })],
};
