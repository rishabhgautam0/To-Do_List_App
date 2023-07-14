package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Tasks;
import com.example.demo.entity.ToDos;
import com.example.demo.exception.ListIdNotFoundException;
import com.example.demo.exception.TaskNotFoundException;
import com.example.demo.repository.ListRepo;
import com.example.demo.repository.TaskRepo;

@Service
@Transactional
public class TaskServiceImpl implements TaskService{
	
	
	@Autowired
	private TaskRepo taskRep;
	
	@Autowired
	private ListRepo listRep;
	
	public List<Tasks> findAllTasks(){
		return taskRep.findAll();
	}

	@Override
	public List<Tasks> findTasksById(Long todoId) {
		return listRep.findByListId(todoId);
	}
	
	@Override
	public String addTask(Tasks t, Long todoId) {
		
		ToDos tod = listRep.findById(todoId).orElseThrow(() -> new ListIdNotFoundException("List Not Found!"));
		t.setToDos(tod);
//		t.setToDos(null);
		taskRep.save(t);
		
		tod.getTasksList().add(t);
		listRep.save(tod);
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
		System.out.println("In delete task service");
		if(taskRep.existsById(id)) {
			taskRep.deleteTaskById(id);
			return "Success!";
		}
		else {
			throw new TaskNotFoundException("Task Not Found!");
		}
		
	}

	@Override
	public String markTaskTrue(Long id) {
		Tasks taskObj = taskRep.findById(id).orElseThrow(() -> new TaskNotFoundException("Task not found!"));
		taskObj.setTaskMarked(true);;
		return "Success!";
	}

	@Override
	public String markTaskFalse(Long id) {
		Tasks taskObj = taskRep.findById(id).orElseThrow(() -> new TaskNotFoundException("Task not found!"));
		taskObj.setTaskMarked(false);;
		return "Success!";
	}

	

}
