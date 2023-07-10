import axios from "axios";
import { BASE_API_URL } from "../common/constants";


const API_URL = BASE_API_URL + "/list";

class listService{
    saveList(list,id){
        console.log(id);
        return axios.post(API_URL + `/add/travel?id=${id}`, list,)
    }

    getAllList(){
        return axios.get(API_URL + `/todos`)
    }
}

export default new listService();