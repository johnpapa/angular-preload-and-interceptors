import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { routes } from './app/router';
import { RouterModule, provideRouter } from '@angular/router';
import { externalModules } from './app/build-specific';
import { AppStoreModule } from './app/store/store.module';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { httpInterceptorProviders, declarations, OnDemandPreloadStrategy } from './app/core';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      RouterModule.forRoot(routes, { preloadingStrategy: OnDemandPreloadStrategy }),
      AppStoreModule,
      externalModules
      // declarations
    ),
    httpInterceptorProviders,
    provideHttpClient(withInterceptorsFromDi()),
    // provideRouter(
    //   routes
    /**
     * Preloading strategies:
     *  - https://angular.io/guide/router#custom-preloading-strategy
     *
     * NoPreloading
     *  - No bundles will preload
     *  - built-in strategy
     *
     * PreloadAllModules
     *  - All bundles will preload, automatically
     *  - built-in strategy
     *  - https://dev.to/angular/preload-all-angular-bundles-1b6l
     *
     * OptInPreloadStrategy
     *  - set data.preload to true/false in the route configuration
     *  - custom strategy
     *  - https://dev.to/angular/you-pick-which-angular-bundles-to-preload-5l9
     *
     * NetworkAwarePreloadStrategy
     *  - Customize which connections types to avoid
     *    ['slow-2g', '2g', '3g', '4g' ]
     *  - custom strategy
     *  - https://dev.to/angular/preload-angular-bundles-when-good-network-connectivity-is-detected-j3a
     *
     * OnDemandPreloadStrategy
     *  - Only preload when a specific event occurs.
     *  - You control when it preloads and what preloads.
     *    - Preload everything
     *      this.preloadOnDemandService.startPreload('*');
     *    - Preload a specific bundle
     *      this.preloadOnDemandService.startPreload(routePath);
     *  - custom strategy
     *  - https://dev.to/angular/predictive-preloading-strategy-for-your-angular-bundles-4bgl
     *
     * QuickLinkStrategy
     *  - Looks for links on the viewable page.
     *  - If they lead to a module, it preloads it (if not already loaded).
     *  - npm i ngx-quicklink --save
     *  - https://github.com/mgechev/ngx-quicklink
     */
    // { preloadingStrategy: OnDemandPreloadStrategy }
    // ),
  ],
}).catch((err) => console.error(err));
