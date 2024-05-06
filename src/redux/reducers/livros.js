const initialState = {
    data: [],
    filter: {
      term: "",
      data: [],
    },
  };
  
  const reducerLivros = (state = initialState, action) => {
    switch (action.type) {
      case "LIVROS_LIST": {
        return {
          ...state,
          data: action.payload, 
          filter: {
            ...state.filter,
            data: action.payload,
          },
        };
      }
  
      case "LIVROS_CREATE": {
        return {
          ...state,
          data: [...state.data, action.payload], 
          filter: {
            ...state.filter,
            data: [...state.data, action.payload], 
          },
        };
      }

      case "LIVROS_DELETE": {
        const deletedLivroId = action.payload;
        const updatedData = state.data.filter((livros) => livros.id !== deletedLivroId);
        return {
          ...state,
          data: updatedData,
          filter: {
            ...state.filter,
            data: updatedData, 
          },
        };
      }

      case "LIVROS_UPDATE": {
        const updatedBook = action.payload;
        const data = state.data.map((livros) =>
          livros.id === updatedBook ? updatedBook : livrost
        );
        return {
          ...state,
          data,
          filter: {
            ...state.filter,
            data,
          },
        };
      }
  

      case "LIVROS_SEARCH": {
        const term = action.payload.sigfox_id || ""; 
        const filteredData = term
          ? state.data.filter((livros) => livros.sigfox_id === term)
          : state.data; 
        return {
          ...state,
          filter: {
            ...state.filter,
            term: term,
            data: filteredData,
          },
        };
      }
      default:
        return state;
    }
  };
  
  export default reducerLivros;
  