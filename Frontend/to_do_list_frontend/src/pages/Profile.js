import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import {  useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import listService from "../services/listService";
import "../styles/ProfileStyle.css";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";

const Profile = () => {

  const [todoDto, setTodoDto] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("")

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
    localStorage.setItem('todoData', JSON.stringify(name));
    navigate(`/edit_todo/${name.todoId}`)
  }

  const deleteTodo = (e, id) => {
    e.preventDefault();
    const updateTodoDtoList = todoDto.filter((todoData) => todoData.todoId !== id);
    setTodoDto(updateTodoDtoList);
    listService.deleteList(id);
  }

  //   var todoButton = document.querySelector(".todo");
  //   ((count%2 ) == 0) ? ( todoButton.style.textDecoration = 'none' ) : ( todoButton.style.textDecoration = 'line-through' );
  //   var taskButton = document.querySelector(".task");
  //   ((count%2 ) == 0) ? ( taskButton.style.textDecoration = 'none' ) : ( taskButton.style.textDecoration = 'line-through' );

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
                    <span>To do: {item.listMarked ? <span>Done</span> : <span>In progress</span>}</span>
                    <button className='todo'>{item.title}</button>
                    {console.log("TodoDto id is: " + item.todoId)}
                    {console.log(item)}
                    <br></br>
                    Tasks:
                    {item.tasks ? (
                      <ul>
                        {item.tasks.map((item2, taskId) => (
                          <li key={item2.taskId}><button className='task'>{item2.task}</button>
                            {console.log("Task Id is " + item2.taskId)}
                          </li>
                        ))}
                      </ul>
                    )
                      :
                      (
                        <div>No Tasks</div>
                      )
                    }
                    <div className='edit-delete'>
                      <button type='button' className='profile-btn' onClick={() => { showNewTodoInput(item) }} ><FiEdit3 /></button>
                      <button className='profile-btn' onClick={(e) => { deleteTodo(e, item.todoId) }}><MdDeleteForever /></button>
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