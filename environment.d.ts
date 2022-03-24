// Copyright 2022 Kenth Fagerlund.
// SPDX-License-Identifier: MIT
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NEXT_PUBLIC_CHAINID: string;
        NODE_ENV: 'development' | 'production';
        INFURA_KEY: string;
        ALCHEMY_KEY: string;
        RPC_ENDPOINT: string;
        SENTRY_IGNORE_API_RESOLUTION_ERROR: number;
      }
    }
  }

  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export { }
