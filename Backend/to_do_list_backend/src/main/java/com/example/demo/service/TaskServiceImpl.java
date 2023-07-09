package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.entity.Tasks;
import com.example.demo.exception.TaskNotFoundException;
import com.example.demo.repository.TaskRepo;

public class TaskServiceImpl implements TaskService{
	
	@Autowired
	private TaskRepo taskRep;
	
	@Autowired
	private Tasks taskObj;

	@Override
	public void addTask(Tasks t) {
		taskRep.save(t);	
	}

	@Override
	public void editTask(Long id, String newTask) {
		if(taskRep.existsById(id)) {
			taskObj.setTask(newTask);
		}
		else {
			throw new TaskNotFoundException("Task Not Found!");
		}
		
	}

	@Override
	public void deleteTask(Long id) {
		if(taskRep.existsById(id)) {
			taskRep.deleteById(id);
		}
		else {
			throw new TaskNotFoundException("Task Not Found!");
		}
		
	}

}
