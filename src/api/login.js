import api from ".";

export function list(){
    const response = api.get('/login').then((response)=> response); 
    return response;
}


export function create(loginParams){
    const response = api.post('/login', loginParams).then((response) => response);
    return response;
}

export function del(id){
    const response = api.delete(`/login/${id}`).then((response) => response);
    return response;
}



const exportedLogin = {list, create, del };

export default exportedLogin;