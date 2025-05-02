import { App } from './App';

// app start

const app = new App();
app.init().catch(err => new Error('Application initialization failed:', err));
