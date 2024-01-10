declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT_BACKEND?: string;
      URL_BACKEND: string;
    }
  }
}

// make it a module
export {}
