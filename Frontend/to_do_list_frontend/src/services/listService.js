import axios from "axios";
import { BASE_API_URL } from "../common/constants";


const API_URL = BASE_API_URL + "/list";

class listService{
    saveList(list,id){
        return axios.post(API_URL + `/add-list?id=${id}`, list,);
    }

    getAllList(){
        return axios.get(API_URL + `/todos`);
    }

    getTodosById(id){
        return axios.get(API_URL + `/todos-by-id?id=${id}`);
    }

    getTodoDtoById(id){
        return axios.get(API_URL + `/tododto-by-id?id=${id}`);
    }

    editList(todoDto){
       
        return axios.post(API_URL + `/update-list`, todoDto);
    }

    deleteList(id){
        return axios.delete(API_URL + `/delete-list?id=${id}`);
    }
}

export default new listService();