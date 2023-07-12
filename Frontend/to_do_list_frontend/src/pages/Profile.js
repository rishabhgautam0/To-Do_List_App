import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import listService from "../services/listService";
import TaskService from '../services/TaskService';
import Tasks from "../models/tasks";
import "../styles/AddListStyle.css";

const Profile = () => {

  const [todoDto, setTodoDto] = useState([]);
  const [todoList, setTodoList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [tasksById, setTasksById] = useState([]);
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
    listService.getTodoDtoById(currentUser?.userId).then((response) => {
      setTodoDto(response.data);
      console.log("ToDTO Response"+todoDto+ " and " +todoDto.tasks);
      console.log("Response from TodoDto: " + response.data);
    })

  }, []);


  const showtasks = async (id) => {
    const divArea = document.getElementById("task-list");
    setTasksById = await TaskService.getTasksById(id);
    console.log("Tasks By id : " + tasksById);

  }

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
      Profile
      <div>
        {todoDto.length === 0 ? (
          <h2 className="text-center">There are no To Do's</h2>
        ) : (
          <div className="container mx-5 my-3">
            <h2>Lists of Travels are as follows:</h2>

            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}

            {infoMessage && (
              <div className="alert alert-success">{infoMessage}</div>

            )}
            <div className='card'>
              {todoDto.map((item,ind) => (
                <div key={item.id}>
                  <div>
                    To do: {item.title}
                    Tasks: <ul>
                    {item.tasks.map((item2, ind2) => {
                      <li key={item2.id}>check{item2}</li>
                    })}
                      </ul> 
                    {/* taskList: {item.tasksList.map((item2,ind2) => {
                      <div key={item.id}>
                        tasks: {item2.task}
                      </div>
                    })} */}
                  </div>
                  {/* <div>Tasks</div> */}
                  {/* <div>
                    {
                      TaskService.getTasksById(item.id).then((response) => {
                        setTaskList(response.data);
                        console.log(taskList);
                      })
                    }
                  </div>
                  <div>
                    {taskList.map((taskItem, inx) => (
                      <div key={taskItem.taskId}>
                        Task: {taskItem.task}
                      </div>
                    ))}
                  </div> */}
                  {/* <div id='task-list'>
                    { taskList.map((item2,ind2) => (
                      <div key={item2.id}>
                        Task: {item2.task}
                        
                      </div>
                    ))}
                  </div> */}
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