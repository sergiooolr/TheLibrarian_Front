// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
 const urlBasic: string = "https://thelibrarianback.herokuapp.com";


export const environment = {


  production: true,
  urlBooksRandom:  `${urlBasic}/get`,
  urlAddBook:  `${urlBasic}/createBook`,
  urlAddReserve:  `${urlBasic}/reserve`,
  urlPdf: `${urlBasic}/reserve/reserve/export/pdf`,
  urlChangePassword:  `${urlBasic}/users/changePassword`,
  urlReservedByUser: `${urlBasic}/reserve/reservedBooksByUserId`,
  urlAllReservesByUser: `${urlBasic}/reserve/getAllReservationById`,
  urlAllBooksByIdBD:  `${urlBasic}/getByIdBook`,
  URLFindByIsbnDB: `${urlBasic}`,
  URLHistory: `${urlBasic}/get/history`,

};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 * import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
 */
