import api from ".";

//tokens
export function loginToken(){
    const response = api.post('/login').then((response)=> response); 
    return response;
}

//primeiro login
export function login(loginParams){
    const response = api.post('/login', loginParams).then((response) => response);
    return response;
}



const exportedLoginAuth = {loginToken, login};

export default exportedLoginAuth;