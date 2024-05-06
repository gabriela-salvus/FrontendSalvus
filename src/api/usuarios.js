import api from ".";

export function list(){
    const response = api.get('/usuarios').then((response)=> response); 
    return response;
}
export function details(id){
    const response = api.get(`/usuarios/${id}`).then((response) => response);
    return response;
}

export function create(livrosParams){
    const response = api.post('/usuarios', livrosParams).then((response) => response);
    return response;
}

export function update(id){
    const response = api.put(`/usurios/${id}`).then((response) => response);
    return response;
}

export function del(id){
    const response = api.delete(`/usurios/${id}`).then((response) => response);
    return response;
}



const exportedUsers = {list, details, create, del };

export default exportedUsers;