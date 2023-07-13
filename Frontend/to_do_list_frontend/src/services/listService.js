import axios from "axios";
import { BASE_API_URL } from "../common/constants";


const API_URL = BASE_API_URL + "/list";

class listService{
    saveList(list,id){
        console.log(id + " " + list);
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
}

export default new listService();