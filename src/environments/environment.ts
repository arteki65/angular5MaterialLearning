// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAAA87Y3veVkXzwz56I_H_JYSBq77h4FUk',
    authDomain: 'ng-fittness.firebaseapp.com',
    databaseURL: 'https://ng-fittness.firebaseio.com',
    projectId: 'ng-fittness',
    storageBucket: 'ng-fittness.appspot.com',
    messagingSenderId: '396725209057'
  }
};
