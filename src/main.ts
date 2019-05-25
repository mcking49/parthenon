import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

const trackingId: string = environment.googleAnalytics.trackingId;
const script: HTMLScriptElement = document.createElement('script');
script.async = true;
script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
document.head.prepend(script);
