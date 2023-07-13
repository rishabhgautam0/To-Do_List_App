import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import listService from "../services/listService";
import TaskService from '../services/TaskService';
import Tasks from "../models/tasks";
import "../styles/ProfileStyle.css";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const Profile = () => {

  const [todoDto, setTodoDto] = useState(["", []]);
  const [newTodo, setNewTodo] = useState([]);
  const [newTask, setNewTask] = useState([]);
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

  // const fetchDto = async () => {
  //   try {
  //     const response = await listService.getTodoDtoById(currentUser?.userId).then((response) => {
  //       setTodoDto(response.data);
  //       console.log("ToDTO title: " + todoDto.title + " and tododto task: " + todoDto.tasks);
  //       console.log("Response Data from TodoDto: " + response);
  //     })
  //   } catch (error) {
  //     console.error("Error fetching data", error)
  //   }
  // }

  const showNewTodoInput = () => {
    document.querySelector(".input-field-todo").style.visibility = "visible";
  }

  const showNewTaskInput = () => {
    document.querySelector(".input-field-task").style.visibility = "visible";
  }

  const handleTodoChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prevState) => {
      return { ...prevState, [name]: value };
      // console.log("newTodo :"+newTodo)
    });
    console.log(newTodo);
  }
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevState) => {
      return { ...prevState, [name]: value };
    });
    console.log(newTodo);
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
                <div key={item.id}>
                  <div className='card'>
                    To do: {item.title}

                    {/* {console.log("TodoDto id is: " + item.dtoId)} */}

                    <button className='profile-btn' onClick={showNewTodoInput}>< FiEdit3 /></button>
                    <button className='profile-btn' onClick={(e) => { deleteTodo(e, item.todoId)} }><MdDeleteForever /></button>
                    <div className='input-field-todo'>
                      <input type='text' id='newTodoInput' name='newList' onChange={(e) => handleTodoChange(e)}></input>
                      <button className='profile-btn' onClick={(e) => editTodo(e, item.todoId)}>Save</button>
                    </div>
                    {console.log(item)}
                    <br></br>
                    Tasks:

                    {item.tasks ? (
                      <ul>
                        {item.tasks.map((item2, taskId) => (

                          <li key={taskId}>{item2.task}
                            {console.log("Task Id is " + item2.taskId)}

                            <button className='profile-btn' onClick={showNewTaskInput}>< FiEdit3 /></button>
                            <button className='profile-btn' onClick={ (e) => { deleteTask(e, item2.taskId) } }><MdDeleteForever /></button>
                            <div className='input-field-task'>
                              <input type='text' id='newTaskInput' name='newTask' onChange={(e) => handleTaskChange(e)}></input>
                              <button className='profile-btn' onClick={(e) => editTask(e, item.taskId)}>Save</button>
                            </div>
                          </li>
                        ))}
                      </ul>

                    )

                      : (

                        <div>No Tasks</div>

                      )
                    }


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