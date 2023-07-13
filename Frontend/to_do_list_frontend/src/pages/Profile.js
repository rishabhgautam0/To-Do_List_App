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

    const fetchDto = async () => {
      try {
        const response = await listService.getTodoDtoById(currentUser?.userId);
        const data = await response.data;
        setTodoDto(data);
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
                    {console.log(item)}
                    <br></br>
                    Tasks: 
                    
                    { item.tasks ?  (
                      <ul>
                      {item.tasks.map( (item2, taskId) => (
                    //  {console.log(item2.taskId)}
                      <li key={taskId}>{ item2.task }< FiEdit3/>  <MdDeleteForever /></li>
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