import loginApi from '../../api/login';

export const list = () => (dispatch) => {
    loginApi.list()
        .then((response) => {
            dispatch({
                type: 'LOGIN_LIST',
                payload: response.data.message,
            });
        })
        .catch((error) => {
            console.error('Erro ao listar logins:', error);
        });
};

export const create = (loginData) => (dispatch) => {
    loginApi.create(loginData)
        .then((response) => {
            dispatch({
                type: "LOGIN_CREATE",
                payload: response.data,
            });
        })
        .catch((error) => {
            console.error('Erro ao logar:', error);
        });
};

export const del = (id) => (dispatch) => {
    loginApi.del(id)
        .then(() => {
            dispatch({
                type: "LOGIN_DELETE",
                payload: id, 
            });
        })
        .catch((error) => {
            console.error('Erro ao excluir login:', error);
        });
};
