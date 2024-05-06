import usuariosApi from '../../api/usuarios';

export const list = () => (dispatch) => {
    usuariosApi.list()
        .then((response) => {
            return response;
        })
            .then((listUsuarios) => dispatch({
                type: 'USUARIOS_LIST',
                payload: listUsuarios.data.message,
            }))
}

export const create = (usuariosParams) => (dispatch) => {
    usuariosApi.create(usuariosParams).then(() =>
    dispatch({
      type: "USUARIOS_CREATE",
      payload: usuariosParams.data,
    })
  )
}


export const del = (id) => (dispatch) => {
    usuariosApi.del(id).then(() =>
      dispatch({
        type: "USUARIOS_DELETE",
        payload: id,
      })
    );
  };

export const update = (id) => (dispatch) => {
    usuariosApi.put(id).then(() =>
        dispatch({
        type: "USUARIOS_UPDATE",
        payload: id,
        })
    );
};  
  
