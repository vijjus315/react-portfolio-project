// https://vitejs.dev/config/
export default {
  server: {
    port: 3000,
    open: true,
  },
  build: {
    rollupOptions: {
      input: "/index.html",
    },
  },
};
