import { useEffect, useState } from "react"
import listService from "../services/listService";
import { useNavigate } from "react-router-dom"; 


export const EditForm = (props) =>{
    const[todoData,setTodoData] = useState({});
    const[title,setTitle] = useState("");
    const[tasks,setTasks] = useState([]);
    const[isTodoMarked,setIsTodoMarked] = useState("");
    const[errormsg,setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() =>{
        const localData = JSON.parse(localStorage.getItem("todoData"));
        if(localData){
            setTodoData(localData);
            setTitle(localData.title);
            setIsTodoMarked(localData.listMarked);
            setTasks(localData.tasks);
            // console.log(localData.tasks);
        }else{
            setErrorMessage("data not loaded");
        }
    },[]
    )

    
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const handleMarkChange = (e) =>{
      setIsTodoMarked(e.target.checked);
    }
    
    const handleTaskNameChange = (e, taskId) => {
        const taskIndex = tasks.findIndex((task) => task.taskId === taskId);
        console.log(taskIndex);
        console.log(taskId);
        if (taskIndex !== -1) {
          const updatedTasks = [...tasks];
          updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], task: e.target.value };
          setTasks(updatedTasks);
        }
        // const updatedTasks = tasks.map((originalTask) =>
        //   originalTask.id === taskId ? { ...originalTask, task: e.target.value } : originalTask
        // );
        // setTasks(updatedTasks);
      };
      const handleTaskMarkChange = (e, taskId) =>{
        const taskIndex = tasks.findIndex((task) => task.taskId === taskId);
        if(taskIndex !== -1){
          const updatedTasks = [...tasks];
          updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], taskMarked: e.target.checked};
          setTasks(updatedTasks);
        }
      }

      const handleUpdate = () => {
        const updatedTodoData = {
          ...todoData,
          listMarked: isTodoMarked,
          title: title,
          tasks: tasks,
        };
        console.log(updatedTodoData);
        listService.editList(updatedTodoData).then((response) =>{
          navigate("/profile");
          console.log(response.data);
        })
        .catch((error) => {
          setErrorMessage("Unexpected error!");
        });
      };
    return(
        <>
        
        <div className='card'>
          <span>{errormsg}</span>
      <h1>Edit Page</h1>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <label>
        status:
        <input type="checkbox" value={isTodoMarked} onChange={handleMarkChange}/>
      </label>
      <h2>Tasks:</h2>
      {tasks.map((task) => (
        <div key={task.taskId}>
          <label>
            Task Name:
            <input
              type="text"
              value={task.task}
              onChange={(e) => handleTaskNameChange(e, task.taskId)}
            />
            
          </label>
          <label>
          status: 
          <input 
            type="checkbox"
            value={task.taskMarked}
            onChange={(e) => handleTaskMarkChange(e,task.taskId)}
          />
          </label>
        
        </div>
      ))}
      <button onClick={handleUpdate}>Update</button>
    </div>
            
        
        </>
    )
}