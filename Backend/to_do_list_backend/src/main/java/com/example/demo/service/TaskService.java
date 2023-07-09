package com.example.demo.service;

import com.example.demo.entity.Tasks;

public interface TaskService {
	
	void addTask(Tasks t);
	
	void editTask(Long id, String newTask);
	
	void deleteTask(Long id);

}
