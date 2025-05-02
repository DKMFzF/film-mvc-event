declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_ORIGIN: string;
			NODE_ENV: 'development' | 'production' | 'testing';
		}
	}
}

export {};
