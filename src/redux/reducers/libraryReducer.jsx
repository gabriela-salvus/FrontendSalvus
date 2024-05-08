/* eslint-disable */
import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE,
    RENT_BOOK,
    RETURN_BOOK,
    DELETE_BOOK,
    ADD_BOOK
  } from '../actions/libraryActions';
  
  const initialState = {
    books: [],
    loading: false,
    error: null
  };
  
  const libraryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BOOKS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_BOOKS_SUCCESS:
        return {
          ...state,
          books: action.payload,
          loading: false,
          error: null
        };
      case FETCH_BOOKS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case RENT_BOOK:
        // Atualizar o estado para refletir o livro como alugado
        const rentedBookId = action.payload;
        return {
          ...state,
          books: state.books.map(book =>
            book.id === rentedBookId ? { ...book, status: 'ALUGADO' } : book
          )
        };
      case RETURN_BOOK:
        // Atualizar o estado para refletir o livro como devolvido
        const returnedBookId = action.payload;
        return {
          ...state,
          books: state.books.map(book =>
            book.id === returnedBookId ? { ...book, status: 'EM ESTOQUE' } : book
          )
        };
      case DELETE_BOOK:
        // Remover o livro da lista
        const deletedBookId = action.payload;
        return {
          ...state,
          books: state.books.filter(book => book.id !== deletedBookId)
        };
      case ADD_BOOK:
        // Adicionar o novo livro à lista
        const newBook = action.payload;
        return {
          ...state,
          books: [...state.books, newBook]
        };
      default:
        return state;
    }
  };
  
  export default libraryReducer;
  