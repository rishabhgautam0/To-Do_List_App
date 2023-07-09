package com.example.demo.service;

import com.example.demo.entity.ToDos;

public interface ListService {
	
	void addList(ToDos toDoList);
	
	void editList(Long id, String newToDo);
	
	void deleteList(Long id);
	
	void addTask(Long id);
	
	void editTask(Long id);
	
	void deleteTask(Long id);

}
