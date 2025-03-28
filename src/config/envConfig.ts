// eslint-disable-next-line @typescript-eslint/no-explicit-any
const envConfig: Record<string, any> = {
  BASED_API_URL: import.meta.env.VITE_BASED_API_URL || "http://localhost:5000",
  REDUX_STORAGE_SECRET_KEY: import.meta.env.VITE_REDUX_STORAGE_SECRET_KEY || "default_secret",
  TIMEZONE: import.meta.env.VITE_TZ || "UTC",
  NODE_ENV: import.meta.env.MODE || "production",
  REACT_APP_REDUX_STORAGE_SECRET_KEY: import.meta.env.REACT_APP_REDUX_STORAGE_SECRET_KEY || "secret123#",
};

export default envConfig;
