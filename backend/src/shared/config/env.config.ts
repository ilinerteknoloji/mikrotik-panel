export const envConfig = () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT) ?? 4000,
    DATABASE: {
      URL: process.env.DATABASE_URL,
      USER: process.env.DATABASE_USER,
      PASSWORD: process.env.DATABASE_PASSWORD,
      NAME: process.env.DATABASE_NAME,
      HOST: process.env.DATABASE_HOST,
      PORT: process.env.DATABASE_PORT,
    },
  };
};
