const isProduction = process.env.NODE_ENV === "production";

/**
 * Настройки сервисов
 */
const config = {
  api: {
    baseUrl: "https://to-do-list-sand-seven.vercel.app/api/",
  },
};

export default config;
