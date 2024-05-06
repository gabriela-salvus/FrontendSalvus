
import api from ".";

export function list(){
    const response = api.get('/livros').then((response)=> response); 
    return response;
}
export function details(id){
    const response = api.get(`/livros/${id}`).then((response) => response);
    return response;
}

export function create(livrosParams){
    const response = api.post('/livros', livrosParams).then((response) => response);
    return response;
}

export function update(id){
    const response = api.put(`/livros/${id}`).then((response) => response);
    return response;
}

export function del(id){
    const response = api.delete(`/livros/${id}`).then((response) => response);
    return response;
}



const exportedBooks = {list, details, create, del };

export default exportedBooks;