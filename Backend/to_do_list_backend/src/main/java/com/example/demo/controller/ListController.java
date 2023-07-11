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

import com.example.demo.entity.ToDos;
import com.example.demo.service.ListService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/list")
public class ListController {

	@Autowired
	private ListService listService;
	
	@PostMapping("/add-list")
	ResponseEntity<?> addNewList(@RequestParam Long id, @RequestBody ToDos todos){
		log.info(todos.getToDoList() + " Marked: " + todos.isListMarked());
		return new ResponseEntity<>(listService.addList(todos, id), HttpStatus.CREATED);
	}
	
	@PostMapping("/update-list")
	ResponseEntity<?> updateList(@RequestParam Long id, @RequestBody String newList){
		return new ResponseEntity<>(listService.editList(id, newList), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete-list")
	ResponseEntity<?> deleteList(@RequestParam Long id){
		return new ResponseEntity<>(listService.deleteList(id), HttpStatus.OK);
	}
	
	@GetMapping("/todos")
	ResponseEntity<?> getAllToDos(){
		return new ResponseEntity<>(listService.findAllToDos(), HttpStatus.OK);
	}
	
}
