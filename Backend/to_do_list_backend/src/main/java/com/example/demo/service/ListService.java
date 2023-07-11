package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.ToDos;

public interface ListService {
	
	String addList(ToDos toDoList, Long userId);
	
	String editList(Long id, String newToDo);
	
	String deleteList(Long id);
	
	List<ToDos> findAllToDos();
	
	List<ToDos> findAllToDosById(Long id);
	

}
