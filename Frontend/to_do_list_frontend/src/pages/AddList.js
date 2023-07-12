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
import TodoDto from "../models/todoDto";

const AddList = () => {
  const currentUser = useSelector((state) => state.user);
  const [todolist, setTodolist] = useState(new Todos());
  const [todoDto, setTodoDto] = useState(new TodoDto());
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const listContainer = document.getElementById("list-container");
  // const inputTask = document.getElementById("input-task");

  // const tasksList = [
  //   { description: 'Task 1' },
  //   { description: 'Task 2' },
  // ];

  const navigate = useNavigate();

  const handleListChange = (e) => {

    const { name, value } = e.target;


    setTodoDto((prevState) => {
      return { ...prevState, [name]: value };
    });
    console.log(todoDto);
  }

  const handleTaskChange = (e) => {

    

    const name = document.getElementById("input-task").value;
    const newTask = new Tasks(null,name,null);
    // setTasks(prevTaskList => [...prevTaskList,newTask]);
    // const { name, value } = e.target;
    // setTasks((prevState) => {
    //   return { ...prevState, [name]: value };
    // });
    // setMyObject((prevState) => ({
    //   ...prevState,
    //   myArray: [...prevState.myArray, newString],
    // }));
   setTodoDto((prevState) => ({
    ...prevState,
    tasks: [...prevState.tasks,newTask],
   }));
    console.log(todoDto.tasks);
    let list = document.createElement('li');
    list.innerHTML = newTask.task;
    listContainer.appendChild(list);

    
  }

  const addNewList = (e) => {

    e.preventDefault();

    // setTodoDto(new TodoDto(todoDto.title,tasks));
    console.log(todoDto);
    listService.saveList(todoDto, currentUser?.userId)
    .then((_) => {
      navigate("/profile");
      console.log(todoDto.title, todoDto.tasks);
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

  // const handleTask = () => {
  //   let newTask = document.createElement('li');
  //   newTask.innerHTML = inputTask.value;
  //   listContainer.appendChild(newTask);
  //   TaskService.saveTask(tasks, currentUser?.userId) .then((_) => {
  //     console.log("added task");
  //   })
  //   .catch((error) =>{
  //     navigate("/login");
  //     console.log(error);
  //     if(error?.response?.status === 409){
  //         setErrorMessage("Task already exists!");
  //     }else{
          
  //         setErrorMessage("Unexpected error occured!");
  //     }
  // });
  // }


  return (
    <div>
      <h1 className='heading'>Add a To Do</h1>
      <div className='card'>
        <h2>Add To-Do List
          <img src={icon}></img>
        </h2>
        <div className='add-list'>
          <input type='text' id='input-list' name='title' value={todoDto.title} onChange={(e) => handleListChange(e)}></input>

        </div>
        <h2>Add Tasks</h2>
        <div className='add-task'>
          <input type='text' id='input-task' name='tasks' />
          <button className='task-button' onClick={(e) => handleTaskChange(e)}>Add</button>
        </div>
        <ul id='list-container'>
          {/* <li>task1</li>
          <li>task2</li> */}
        </ul>
        <button className='btn' onClick={(e) => addNewList(e)}>Save</button>
      </div>
    </div>
  )
}

export default AddList