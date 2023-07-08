package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entity.ToDos;
import com.example.demo.exception.ListIdNotFoundException;
import com.example.demo.repository.ListRepo;

public class ListServiceImpl implements ListService{
	
	@Autowired
	ListRepo rep;
	
	@Autowired
	ToDos todo;

	@Override
	public void addList(ToDos toDoList) {
		rep.save(toDoList);
	}

	@Override
	public void editList(Long id, String newToDo) {
		if(rep.existsById(id)) {
			todo.setToDoList(newToDo);
		}
		else {
			throw new ListIdNotFoundException("To Do List not exists!");
		}
	}

	@Override
	public void deleteList(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addTask(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void editTask(Long id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteTask(Long id) {
		// TODO Auto-generated method stub
		
	}

	

}
