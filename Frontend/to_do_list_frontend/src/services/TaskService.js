import axios from "axios";
import { BASE_API_URL } from "../common/constants";


const API_URL = BASE_API_URL + "/list/task";

class TaskService{
    saveTask(task, listId){
        console.log(listId);
        return axios.post(API_URL + `/add-task?id=${listId}`, task,)
    }
    getAlltask(){
        return axios.get(API_URL + `/all-tasks`);
    }
}

export default new TaskService();
