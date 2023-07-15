package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.TodoDTO;
import com.example.demo.entity.ToDos;

public interface ListService {
	
	String addList(TodoDTO toDoList, Long userId);
	
	String editList(TodoDTO dto);
	
	String deleteList(Long id);
	
	List<ToDos> findAllToDos();
	
	List<ToDos> findAllToDosById(Long id);
	
	List<TodoDTO> findAllTodoTask(Long id);
	
	String markTodoTrue(Long id);
	
	String markTodoFalse(Long id);
}
