// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  API:"https://api.niftyleveltracker.in/",
  // API:"http://192.168.0.228:8000",

  firebase: {
    projectId: 'stonks-b66d4',
    appId: '1:760823659531:web:7194546693050eea9b5b0e',
    databaseURL: 'https://stonks-b66d4-default-rtdb.firebaseio.com',
    storageBucket: 'stonks-b66d4.appspot.com',
    apiKey: 'AIzaSyBFEVrehqUHseBO7l9X6-b2GvQzEfROk38',
    authDomain: 'stonks-b66d4.firebaseapp.com',
    messagingSenderId: '760823659531',
    measurementId: 'G-PFN3XJKHYH',
  },
  production: false,
  StripeKey:"pk_test_51NRBG8SBGsqYtPbhHvE8XO8NY6vxgKLTv6wENQM3friu7i3hb2pMcEZjAOl0B5ETUthd5AXUTmuJYduVCsvIBLxp003kjz2LWn"
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
