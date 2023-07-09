package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Tasks;
import com.example.demo.service.TaskService;

@RestController
@RequestMapping("/list/task")
public class TaskController {

	@Autowired
	private TaskService taskService;
	
	@PostMapping("/add-list")
	ResponseEntity<?> addNewList(@RequestParam Long id, @RequestBody Tasks tasks){
		return new ResponseEntity<>(taskService.addTask(tasks, id), HttpStatus.CREATED);
	}
	
	@PostMapping("/update-list")
	ResponseEntity<?> updateList(@RequestParam Long id, @RequestBody String newTask){
		return new ResponseEntity<>(taskService.editTask(id, newTask), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-list")
	ResponseEntity<?> deleteList(@RequestParam Long id){
		return new ResponseEntity<>(taskService.deleteTask(id), HttpStatus.OK);
	}
	
	
}
