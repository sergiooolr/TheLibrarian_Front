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