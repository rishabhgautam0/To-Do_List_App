import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import listService from "../services/listService";
import TaskService from '../services/TaskService';
import Tasks from "../models/tasks";
import "../styles/ProfileStyle.css";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const Profile = () => {

  const [todoDto, setTodoDto] = useState([]);
  const [newTodo, setNewTodo] = useState([]);
  const [newTask, setNewTask] = useState("");
  // const [tasks, setTasks] = useState(new Tasks());
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("")

  const listContainer = document.getElementById("list-container");
  const inputTask = document.getElementById("input-task");

  const currentUser = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("use effect1");

    const fetchDto = async () => {
      try {
        const response = await listService.getTodoDtoById(currentUser?.userId);
        const data = await response.data;
        setTodoDto(data);
         console.log("todoDto contains: " + todoDto)
      } catch (error) {
        console.error("Error fetching data", error)
      }
    }

    fetchDto();


  }, []);


  const showNewTodoInput = (name) => {
    console.log(name);
    localStorage.setItem('todoData',JSON.stringify(name));
    navigate(`/edit_todo/${name.todoId}`)
    
  }

  const showNewTaskInput = (name) => {
    document.querySelector(".input-field-task").style.visibility = "visible";
    document.getElementById("newTaskInput").value = name;
  }

  const handleTodoChange = (e) => {
    // const { name, value } = e.target;
    setNewTodo(e.target.value);
    console.log(newTodo);
  }
  const handleTaskChange = (e) => {
    
    setNewTask(e.target.value);
  }

  const editTodo = (e, id) => {
    e.preventDefault();

    listService.editList(id, newTodo);
  }
  const editTask = (e, id) => {
    e.preventDefault();

    TaskService.editTask(id, newTask);
  }

  const deleteTodo = (e, id) => {
    e.preventDefault();

    listService.deleteList(id);
  }
  const deleteTask = (e, id) => {
    e.preventDefault();

    TaskService.deleteTask(id);
  }

  // var count = 0; 
  // const markUnmarkList = (e) => {
  //   e.preventDefault();
  //   count = count + 1;
  //   console.log("value of count: " + count);
  //   console.log("value of count %: " + count%2);
  //   var todoButton = document.querySelector(".todo");
    
  //   ((count%2 ) == 0) ? ( todoButton.style.textDecoration = 'none' ) : ( todoButton.style.textDecoration = 'line-through' );
  // }
  // var count = 0; 
  // const markUnmarkTask = (e) => {
  //   e.preventDefault();
  //   count = count + 1;
  //   console.log("value of count: " + count);
  //   console.log("value of count %: " + count%2);
  //   var taskButton = document.querySelector(".task");
    
  //   ((count%2 ) == 0) ? ( taskButton.style.textDecoration = 'none' ) : ( taskButton.style.textDecoration = 'line-through' );
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
              {todoDto.map((item, index) => (
                <div key={item.todoId}>
                  <div className='card'>
                 <span>To do: {item.listMarked ? <span>done</span> : <span>in progress</span>}</span>
                    <button className='todo'>{item.title}</button>

                    {console.log("TodoDto id is: " + item.todoId)}
            
                    {/* <button type='button' className='profile-btn' onClick={() => { showNewTodoInput(item)} } ><FiEdit3 /></button>
                   
                    <button className='profile-btn' onClick={(e) => { deleteTodo(e, item.todoId)} }><MdDeleteForever /></button> */}
                    
                    {console.log(item)}
                    <br></br>
                    Tasks:

                    {item.tasks ? (
                      <ul>
                        {item.tasks.map((item2, taskId) => (

                          <li key={item2.taskId}><button className='task' /*onClick={ (e) => { markUnmarkTask(e)} } */>{item2.task}</button>
                            {console.log("Task Id is " + item2.taskId)}

                            {/* <button className='profile-btn' onClick={() => showNewTaskInput(item2.task)}>< FiEdit3 /></button>
                            <button className='profile-btn' onClick={ (e) => { deleteTask(e, item2.taskId) } }><MdDeleteForever /></button>
                            <div className='input-field-task'>
                              <input type='text' id='newTaskInput' name='newTask' onChange={handleTaskChange}></input>
                              <button className='profile-btn' onClick={(e) => editTask(e, item2.taskId)}>Save</button>
                            </div> */}
                          </li>
                        ))}
                      </ul>

                    )

                      : (

                        <div>No Tasks</div>

                      )
                    }

                    <div className='edit-delete'>
                    <button type='button' className='profile-btn' onClick={() => { showNewTodoInput(item)} } ><FiEdit3 /></button>
                   
                   <button className='profile-btn' onClick={(e) => { deleteTodo(e, item.todoId)} }><MdDeleteForever /></button>
                   
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