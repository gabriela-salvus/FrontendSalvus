import { configureStore } from '@reduxjs/toolkit'

import reducerLivros from './reducers/livros';
import reducerUsuarios from './reducers/usuarios';
import reducerLoginAuth from './reducers/loginAuth';
import reducerPage from './reducers/navigation';



export default configureStore({
  reducer: {
    livros: reducerLivros,
    usuarios: reducerUsuarios,
    loginAuth: reducerLoginAuth,
    navigation: reducerPage,
     
  }
})


