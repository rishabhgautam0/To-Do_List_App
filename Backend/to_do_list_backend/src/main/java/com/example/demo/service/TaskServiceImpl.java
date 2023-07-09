package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Tasks;
import com.example.demo.exception.TaskNotFoundException;
import com.example.demo.repository.TaskRepo;

@Service
@Transactional
public class TaskServiceImpl implements TaskService{
	
	@Autowired
	private TaskRepo taskRep;

	@Override
	public String addTask(Tasks t, Long listId) {
		taskRep.save(t);
		return "Success!";
		
	}

	@Override
	public String editTask(Long id, String newTask) {
	
			Tasks taskObj = taskRep.findById(id).orElseThrow(() -> new TaskNotFoundException("Task not found!"));
			taskObj.setTask(newTask);
			return "Success!";
		
	}

	@Override
	public String deleteTask(Long id) {
		if(taskRep.existsById(id)) {
			taskRep.deleteById(id);
			return "Success!";
		}
		else {
			throw new TaskNotFoundException("Task Not Found!");
		}
		
	}

}
