import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load env file based on the current mode ('development', 'production', etc.)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        "/api": {
          target: env.VITE_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
    define: {
      "process.env": env,
    },
  };
});
