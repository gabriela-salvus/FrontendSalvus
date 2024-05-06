import livrosApi from '../../api/livros';

export const list = () => (dispatch) => {
    livrosApi.list()
        .then((response) => {
            return response;
        })
            .then((listLivros) => dispatch({
                type: 'LIVROS_LIST',
                payload: listLivros.data.message,
            }))
}

export const create = (livrosParams) => (dispatch) => {
    livrosApi.create(livrosParams).then(() =>
    dispatch({
      type: "LIVROS_CREATE",
      payload: livrosParams.data,
    })
  )
}


export const del = (id) => (dispatch) => {
    livrosApi.del(id).then(() =>
      dispatch({
        type: "LIVROS_DELETE",
        payload: id,
      })
    );
  };

export const update = (id) => (dispatch) => {
    livrosApi.put(id).then(() =>
        dispatch({
        type: "LIVROS_UPDATE",
        payload: id,
        })
    );
};  
  
export const search = (searchParams) => (dispatch) => {
    dispatch ({
      type: "LIVROS_SEARCH",
      payload: { sigfox_id: searchParams },
    });
  };
  
  
