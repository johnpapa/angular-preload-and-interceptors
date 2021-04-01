# Tour of Heroes - Angular Preload and Http Interceptors Demo

This project was created to help represent a fundamental app written with Angular that demonstrates preload strategies, guards, and http interceptors. The heroes and villains theme is used throughout the app.

by [John Papa](http://twitter.com/john_papa)

## Getting Started

1. Clone this repository

   ```bash
   git clone https://github.com/johnpapa/angular-preload-and-interceptors.git tour
   cd tour
   ```

1. Install the npm packages

   ```bash
   npm run full-stack
   ```

## What's in the App

Here is a list of the features in this app:

- [x] Start from the official quick-start and CLI
- [x] Client side routing
  - [x] Three main routes Heroes, Villains, About
  - [x] Handles an erroneous route, leading to a PageNotFound component
  - [x] Active route is highlighted in the nav menu
  - [x] Routing should use html5 mode, not hash routes
  - [x] Routing guards
  - [x] Preload strategies
- [x] API
  - [x] JSON server as a backend
  - [x] App served on one port which can access API on another port proxy or CORS)
  - [x] HTTP - Uses most common client http libraries for each framework
  - [x] HTTP interceptors
  - [x] API routes are restricted to those who sign in except `movies`
  - [x] API route `movies` is readonly to all (no sign in required)
- [x] Auth
  - [x] Sign in and sign out with json-server-auth
- [x] Styling
  - [x] Bulma
  - [x] SASS
  - [x] Font Awesome
  - [x] Same exact css in every app
- [x] Editing - Heroes and Villains will be editable (add, update, delete)
- [x] State/Store - Uses a store for state management
- [x] Web development server handles fallback routing
- [x] Generic components
  - [x] Modal
  - [x] Button Tool
  - [x] Card
  - [x] Header bar
  - [x] List header
  - [x] Nav bar
- [x] Props in and emit events out
- [x] Environment variable for the API location

### Why JSON Server?

The app uses a JSON server for a backend by default. This allows you to run the code without needing any database engines or cloud accounts. It also supports authorized routes, which this app takes advantage of. iEnjoy!

### Interceptors

Sequence is super important with interceptors. The flow in sequence for requests, and then in the opposite order for responses.

```typescript
export const httpInterceptorProviders = [
  /**
   *  Log Http:
   *    This logs all HTTP traffic.
   *    Should be first-ish so it can log the Http call happening in and out (last).
   */
  { provide: HTTP_INTERCEPTORS, useClass: LogHttpInterceptor, multi: true },
  /**
   * ReadOnly:
   *    Do this before we add headers, get busy, or make the call.
   */
  { provide: HTTP_INTERCEPTORS, useClass: ReadOnlyInterceptor, multi: true },
  /**
   * SSL, Auth, CSRF:
   *    Now that it has passed the readonly test, we want to stuff headers and proceed.
   */
  { provide: HTTP_INTERCEPTORS, useClass: EnsureSSLInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CSRFInterceptor, multi: true },
  /**
   *  Log headers:
   *    Must come after the headers are stuffed.
   */
  { provide: HTTP_INTERCEPTORS, useClass: LogHeadersInterceptor, multi: true },
  /**
   *  Busy:
   *    Should be first so it can turn on first, and off last.
   */
  { provide: HTTP_INTERCEPTORS, useClass: BusyInterceptor, multi: true },
  /**
   * Transform Response:
   *    this could happen anywhere in this particular stream,
   *    as long as it happens after the first Http log.
   *    Why? Because the interceptors are FIFO
   */
  { provide: HTTP_INTERCEPTORS, useClass: TransformResponseInterceptor, multi: true },
];
```

## Problems or Suggestions

[Open an issue here](/issues)

## Resources

- [VS Code](https://code.visualstudio.com/?WT.mc_id=javascript-0000-jopapa)
- [Azure Free Trial](https://azure.microsoft.com/free/?WT.mc_id=javascript-0000-jopapa)
- [VS Code Extension for Node on Azure](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack&WT.mc_id=javascript-0000-jopapa)
- [VS Code Extension Marketplace](https://marketplace.visualstudio.com/vscode?WT.mc_id=javascript-0000-jopapa)
- [VS Code - macOS keys](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf?WT.mc_id=javascript-0000-jopapa)
- [VS Code - Windows keys](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf?WT.mc_id=javascript-0000-jopapa)
- [Debugging Angular in VS Code](https://code.visualstudio.com/docs/nodejs/angular-tutorial?WT.mc_id=javascript-0000-jopapa)
