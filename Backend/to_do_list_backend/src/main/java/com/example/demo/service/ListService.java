package com.example.demo.service;

import com.example.demo.entity.ToDos;

public interface ListService {
	
	void addList(ToDos toDoList, Long userId);
	
	void editList(Long id, String newToDo);
	
	void deleteList(Long id);
	

}
