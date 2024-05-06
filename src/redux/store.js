import { configureStore } from '@reduxjs/toolkit'
import reducerLivros from './reducers/livros';
import reducerUsuarios from './reducers/usuarios';
import reducerLogin from './reducers/login';
import reducerPage from './reducers/navigation'

export default configureStore({
  reducer: {
    livros: reducerLivros,
    usuarios: reducerUsuarios,
    login: reducerLogin,
    navigation: reducerPage
  }
})


