package com.example.demo.service;

import com.example.demo.entity.Tasks;

public interface TaskService {
	
	String addTask(Tasks t , Long listId);
	
	String editTask(Long id, String newTask);
	
	String deleteTask(Long id);

}
