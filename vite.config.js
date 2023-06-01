import basicSsl from "@vitejs/plugin-basic-ssl";

export default {
  root: "src",
  build: {
    target: "esnext",
    outDir: "../dist",
  },
  server: {
    https: true,
  },
  plugins: [basicSsl()],
};
