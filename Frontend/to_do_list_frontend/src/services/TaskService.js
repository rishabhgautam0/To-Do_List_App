import axios from "axios";
import { BASE_API_URL } from "../common/constants";


const API_URL = BASE_API_URL + "/list/task";

class TaskService{
    saveTask(task, id){
        console.log(id);
        return axios.post(API_URL + `/add-task?id=${id}`, task,)
    }
    getAllTask(){
        return axios.get(API_URL + `/all-tasks`);
    }

    getTasksById(id){
        return axios.get(API_URL + `/tasks-by-id?id=${id}`);
    }
}

export default new TaskService();
