const initialState = {
    data: [],
    filter: {
      term: "",
      data: [],
    },
  };
  
  const reducerUsuarios = (state = initialState, action) => {
    switch (action.type) {
      case "USUARIOS_LIST": {
        return {
          ...state,
          data: action.payload, 
          filter: {
            ...state.filter,
            data: action.payload,
          },
        };
      }
  
      case "USUARIOS_CREATE": {
        return {
          ...state,
          data: [...state.data, action.payload], 
          filter: {
            ...state.filter,
            data: [...state.data, action.payload], 
          },
        };
      }

      case "USUARIOS_DELETE": {
        const deletedUsuarioId = action.payload;
        const updatedData = state.data.filter((usuario) => usuario.id !== deletedUsuarioId);
        return {
          ...state,
          data: updatedData,
          filter: {
            ...state.filter,
            data: updatedData, 
          },
        };
      }

      case "USUARIOS_UPDATE": {
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
  

      case "USUARIOS_SEARCH": {
        const term = action.payload.sigfox_id || ""; 
        const filteredData = term
          ? state.data.filter((livro) => livro.sigfox_id === term)
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
  
  export default reducerUsuarios;
  