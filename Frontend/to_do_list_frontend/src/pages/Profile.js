import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import listService from "../services/listService";
import TaskService from '../services/TaskService';
import Tasks from "../models/tasks";
import "../styles/AddListStyle.css";

const Profile = () => {

  const [todoDto, setTodoDto] = useState(["",[]]);
  const [taskObj, setTaskObj] = useState( new Tasks);
  const [todoList, setTodoList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [tasksById, setTasksById] = useState([]);
  var taskArray = [];
  // const [tasks, setTasks] = useState(new Tasks());
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("")

  const listContainer = document.getElementById("list-container");
  const inputTask = document.getElementById("input-task");

  const currentUser = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("use effect1");
    // TaskService.getAllTask()
    // .then((response) => {
    //   setTaskList(response.data);
    //   console.log("Task List feteched are: " + response.data)
    // });
    // listService.getTodosById(currentUser?.userId).then((response) => {
    //   setTodoList(response.data,[taskList]);
    //   console.log("Todo List Fetched are: ", response.data);
    // });
    fetchDto();

  }, []);

  const fetchDto = async () => {
    try{
      const response = await listService.getTodoDtoById(currentUser?.userId).then((response) => {
        setTodoDto(response.data);
        console.log("ToDTO title: "+ todoDto.title + " and tododto task: " +todoDto.tasks);
        console.log("Response Data from TodoDto: " + response);
      })
    } catch(error){
      console.error("Error fetching data", error)
    }
  }


  // const showtasks = async (id) => {
  //   const divArea = document.getElementById("task-list");
  //   setTasksById = await TaskService.getTasksById(id);
  //   console.log("Tasks By id : " + tasksById);

  // }

  // const handleTaskChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(currentUser);

  //   setTasks((prevState) => {
  //     return { ...prevState, [name]: value };
  //   });
  // }

  // const handleTask = () => {
  //   let newTask = document.createElement('li');
  //   newTask.innerHTML = inputTask.value;
  //   listContainer.appendChild(newTask);
  //   TaskService.saveTask(tasks, currentUser?.userId).then((_) => {
  //     console.log("added task");
  //   })
  //     .catch((error) => {
  //       navigate("/login");
  //       console.log(error);
  //       if (error?.response?.status === 409) {
  //         setErrorMessage("Task already exists!");
  //       } else {

  //         setErrorMessage("Unexpected error occured!");
  //       }
  //     });
  // }

  return (

    <div>
      <Header />
      
      <div>
        {todoDto.length === 0 ? (
          <h2 className="text-center">There are no To Do's</h2>
        ) : (
          <div className="container mx-5 my-3">
            <h2>Lists of To Do's are:</h2>

            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            {infoMessage && (
              <div className="alert alert-success">{infoMessage}</div>

            )}
            <div >
              {todoDto.map((item,ind) => (
                <div key={ind}>
                  <div className='card'>
                    To do: {item.title}
                    {console.log(item)}
                    <div>
                    Tasks: <ul>
                    {/* {item.tasks.map((item2, taskId) => {
                    //  {console.log(task)}
                      <li key={taskId}>check{item2.task}</li>
                    })} */}
                      </ul> 
                    </div>
                    
                  </div>
                  
                </div>
              ))}

            </div>

          </div>

        )}
      </div>
    </div>
  )
}

export default Profile