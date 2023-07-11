import React, { useState } from 'react';
import "../styles/AddListStyle.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import listService from "../services/listService";
import icon from "../asset/images/icon.png";
import checked from "../asset/images/icon.png";
import unchecked from "../asset/images/icon.png";
import Todos from "../models/todos";
import Tasks from "../models/tasks";
import TaskService from '../services/TaskService';

const AddList = () => {
  const currentUser = useSelector((state) => state.user);
  const [todolist, setTodolist] = useState(new Todos());
  const [tasks, setTasks] = useState(new Tasks());
  const [errorMessage, setErrorMessage] = useState("");
  const listContainer = document.getElementById("list-container");
  const inputTask = document.getElementById("input-task");

  const navigate = useNavigate();

  const handleListChange = (e) => {
    const { name, value } = e.target;
    console.log(currentUser);

    setTodolist((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    console.log(currentUser);

    setTasks((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  const addNewList = () => {
    listService.saveList(todolist, currentUser?.userId)
    .then((_) => {
      navigate("/profile");
      console.log(todolist);
    })
    .catch((error) =>{
      navigate("/login");
      console.log(error);
      if(error?.response?.status === 409){
          setErrorMessage("To Do List already exists");
      }else{
          
          setErrorMessage("Unexpected error occured");
      }
  });
  }

  const handleTask = () => {
    let newTask = document.createElement('li');
    newTask.innerHTML = inputTask.value;
    listContainer.appendChild(newTask);
    TaskService.saveTask(tasks, currentUser?.userId) .then((_) => {
      console.log("added task");
    })
    .catch((error) =>{
      navigate("/login");
      console.log(error);
      if(error?.response?.status === 409){
          setErrorMessage("Task already exists!");
      }else{
          
          setErrorMessage("Unexpected error occured!");
      }
  });
  }


  return (
    <div>
      <h1 className='heading'>Add a To Do</h1>
      <div className='card'>
        <h2>Add To-Do List
          <img src={icon}></img>
        </h2>
        <div className='add-list'>
          <input type='text' id='input-list' name='toDoList' value={todolist.toDoList} onChange={(e) => handleListChange(e)}></input>

        </div>
        <h2>Add Tasks</h2>
        <div className='add-task'>
          <input type='text' id='input-task' name='task' value={tasks.task} onChange={(e) => handleTaskChange(e)}></input>
          <button className='task-button' onClick={handleTask}>Add</button>
        </div>
        <ul id='list-container'>
          {/* <li>task1</li>
          <li>task2</li> */}
        </ul>
        <button className='btn' onClick={addNewList}>Save</button>
      </div>
    </div>
  )
}

export default AddList