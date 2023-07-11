package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.ToDos;
import com.example.demo.entity.User;
import com.example.demo.exception.ListIdNotFoundException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.ListRepo;
import com.example.demo.repository.UserRepo;

@Service
@Transactional
public class ListServiceImpl implements ListService{
	
	@Autowired
	private ListRepo listRep;
	
	@Autowired
	private UserRepo userRep;
	
	@Override
	public List<ToDos> findAllToDos(){
		return listRep.findAll();
	}	
	
	@Override
	public List<ToDos> findAllToDosById(Long userId) {
		return userRep.findByUserId(userId);
	}

	@Override
	public String addList(ToDos toDoList, Long userId) {
		User user = userRep.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found!"));
		toDoList.setUser(user);
		listRep.save(toDoList);
	
		user.getToDos().add(toDoList);
		userRep.save(user);
		System.out.println(user.getToDos().toString());

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
