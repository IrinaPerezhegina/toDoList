const isProduction = process.env.NODE_ENV === "production";

/**
 * Настройки сервисов
 */
const config = {
  api: {
    baseUrl: "api/",
  },
};

export default config;
