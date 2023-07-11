import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import listService from "../services/listService";
import TaskService from '../services/TaskService';
import Tasks from "../models/tasks";
import "../styles/AddListStyle.css";

const Profile = () => {

  const [todoList, setTodoList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [tasks, setTasks] = useState(new Tasks());
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("")

  const listContainer = document.getElementById("list-container");
  const inputTask = document.getElementById("input-task");

  const currentUser = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("use effect1");
    listService.getTodosById(currentUser?.userId).then((response) => {
      setTodoList(response.data);
      console.log( {todoList});
    });
  }, []);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    console.log(currentUser);

    setTasks((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  const handleTask = () => {
    let newTask = document.createElement('li');
    newTask.innerHTML = inputTask.value;
    listContainer.appendChild(newTask);
    TaskService.saveTask(tasks, currentUser?.userId).then((_) => {
      console.log("added task");
    })
      .catch((error) => {
        navigate("/login");
        console.log(error);
        if (error?.response?.status === 409) {
          setErrorMessage("Task already exists!");
        } else {

          setErrorMessage("Unexpected error occured!");
        }
      });
  }

  return (

    <div>
      <Header />
      Profile
      <div>
        {todoList.length === 0 ? (
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
              {todoList.map((item, ind) => (
                <div key={item.id}>
                  <div>
                    To do: {item.toDoList}
                  </div>
                  <div>Tasks</div>
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
                      <div key={taskItem.id}>
                        Task: {taskItem.task}
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