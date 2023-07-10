import React, { useState } from 'react';
import "../styles/AddListStyle.css";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import listService from "../services/listService";

const AddList = () => {
  const [list, setList] = useState(false);
  const currentUser = useSelector((state) => state.user);
  const addList = (e) => {

    e.preventDefault();
    listService.saveList()

  }

  return (
    <div>
      <h1 className='heading'>Add a To Do</h1>
      
    </div>
  )
}

export default AddList