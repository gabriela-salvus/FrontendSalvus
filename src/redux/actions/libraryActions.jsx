// libraryActions.js
export const FETCH_BOOKS_REQUEST = 'FETCH_BOOKS_REQUEST';
export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_FAILURE = 'FETCH_BOOKS_FAILURE';
export const RENT_BOOK = 'RENT_BOOK';
export const RETURN_BOOK = 'RETURN_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';
export const ADD_BOOK = 'ADD_BOOK';

export const fetchBooksRequest = () => ({
  type: FETCH_BOOKS_REQUEST
});

export const fetchBooksSuccess = (books) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: books
});

export const fetchBooksFailure = (error) => ({
  type: FETCH_BOOKS_FAILURE,
  payload: error
});

export const rentBook = (bookId) => ({
  type: RENT_BOOK,
  payload: bookId
});

export const returnBook = (bookId) => ({
  type: RETURN_BOOK,
  payload: bookId
});

export const deleteBook = (bookId) => ({
  type: DELETE_BOOK,
  payload: bookId
});

export const addBook = (bookData) => ({
  type: ADD_BOOK,
  payload: bookData
});
