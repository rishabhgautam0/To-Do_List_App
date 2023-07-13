package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.TodoDTO;
import com.example.demo.service.ListService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/list")
public class ListController {

	@Autowired
	private ListService listService;
	
	
	@GetMapping("/todos")
	ResponseEntity<?> getAllToDos(){
		return new ResponseEntity<>(listService.findAllToDos(), HttpStatus.OK);
	}
	
	@GetMapping("/todos-by-id")
	ResponseEntity<?> getAllToDosById(@RequestParam Long id){
		return new ResponseEntity<>(listService.findAllToDosById(id), HttpStatus.OK);
	}
	
	@GetMapping("/tododto-by-id")
	ResponseEntity<?> getAllTodoDtoById(@RequestParam Long id){
		System.out.println("In tododto-by-id controller");
		return new ResponseEntity<>(listService.findAllTodoTask(id), HttpStatus.OK);
	}
	
	@PostMapping("/add-list")
	ResponseEntity<?> addNewList(@RequestParam Long id, @RequestBody TodoDTO todoDto){
		log.info(todoDto.getTitle() + " Task List: " + todoDto.getTasks() + "UserId" + id);
		return new ResponseEntity<>(listService.addList(todoDto, id), HttpStatus.CREATED);
	}
	
	@PostMapping("/update-list")
	ResponseEntity<?> updateList(@RequestParam Long id, @RequestBody String newList){
		return new ResponseEntity<>(listService.editList(id, newList), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-list")
	ResponseEntity<?> deleteList(@RequestParam Long id){
		return new ResponseEntity<>(listService.deleteList(id), HttpStatus.OK);
	}

}
