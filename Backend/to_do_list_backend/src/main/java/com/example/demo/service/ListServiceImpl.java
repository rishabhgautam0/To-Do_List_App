package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entity.ToDos;
import com.example.demo.entity.User;
import com.example.demo.exception.ListIdNotFoundException;
import com.example.demo.repository.ListRepo;

public class ListServiceImpl implements ListService{
	
	@Autowired
	private ListRepo rep;
	
	@Autowired
	private ToDos todo;
	
	@Autowired
	private User user;

	@Override
	public void addList(ToDos toDoList, Long userId) {
		rep.save(toDoList);
//		List<ToDos> updatedList = 
//		user.getToDos();
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
		if(rep.existsById(id)) {
			rep.deleteById(id);
		}
		else {
			throw new ListIdNotFoundException("To Do List not exists!");
		}
		
	}


	

}
