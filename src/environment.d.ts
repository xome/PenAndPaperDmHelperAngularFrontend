declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      URL_BACKEND: string;
    }
  }
}

// make it a module
export {}
