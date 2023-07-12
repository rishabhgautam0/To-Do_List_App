package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Tasks;

public interface TaskService {
	
	String addTask(Tasks t , Long listId);
	
	String editTask(Long id, String newTask);
	
	String deleteTask(Long id);
	
	List<Tasks> findAllTasks();
	
	List<Tasks> findTasksById(Long todoId);

}
