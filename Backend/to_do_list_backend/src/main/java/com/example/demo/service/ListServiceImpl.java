package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.ToDos;
import com.example.demo.exception.ListIdNotFoundException;
import com.example.demo.repository.ListRepo;

@Service
@Transactional
public class ListServiceImpl implements ListService{
	
	@Autowired
	private ListRepo listRep;
	
	@Override
	public List<ToDos> findAllToDos(){
		return listRep.findAll();
	}	

	@Override
	public String addList(ToDos toDoList, Long userId) {
		listRep.save(toDoList);
//		List<ToDos> updatedList = user.getToDos();
//		updatedList.add(toDoList);
//		user = userRep.getById(userId);
//		user.setToDos(updatedList);
		return "Success!";
	}

	@Override
	public String editList(Long id, String newToDo) {
			ToDos todo = listRep.findById(id).orElseThrow(() -> new ListIdNotFoundException("List not found!"));
			todo.setToDoList(newToDo);
			return "Success!";
	}

	@Override
	public String deleteList(Long id) {
		if(listRep.existsById(id)) {
			listRep.deleteById(id);
			return "Success!";
		}
		else {
			throw new ListIdNotFoundException("To Do List not exists!");
		}
		
	}
	



	

}
