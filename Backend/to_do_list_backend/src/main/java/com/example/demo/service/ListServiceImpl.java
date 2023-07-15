package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.TodoDTO;
import com.example.demo.entity.Tasks;
import com.example.demo.entity.ToDos;
import com.example.demo.entity.User;
import com.example.demo.exception.ListIdNotFoundException;
import com.example.demo.exception.TaskNotFoundException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.ListRepo;
import com.example.demo.repository.TaskRepo;
import com.example.demo.repository.UserRepo;

@Service
@Transactional
public class ListServiceImpl implements ListService{
	
	@Autowired
	private ListRepo listRep;
	
	@Autowired
	private UserRepo userRep;
	
	@Autowired
	private TaskRepo taskRep;
	
	@Autowired
	private TaskService taskService;
	
	@Override
	public List<ToDos> findAllToDos(){
		return listRep.findAll();
	}	
	
	@Override
	public List<ToDos> findAllToDosById(Long userId) {
		return userRep.findByUserId(userId);
	}
	

	@Override
	public List<TodoDTO> findAllTodoTask(Long userId) {
		User user = userRep.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found!"));
		List<ToDos> listTodos = new ArrayList<ToDos>();
		listTodos = findAllToDosById(userId);
		List<TodoDTO> listToDoDto = new ArrayList<TodoDTO>(); 
		for(ToDos t : listTodos) {
			List<Tasks> taskList = listRep.findByListId(t.getToDoListId());
			TodoDTO tod = new TodoDTO();
			tod.setTodoId(t.getToDoListId());
			tod.setTitle(t.getToDoList());
			tod.setListMarked(t.isListMarked());
			tod.setTasks(taskList);
			listToDoDto.add(tod);
			System.out.println("Title in tod:"+ tod.getTitle() + "task in tdodto: "+ tod.getTasks().size());
		}
		System.out.println("ToDTO object is:" + listToDoDto.size());
		return listToDoDto;
	}

	@Override
	public String addList(TodoDTO toDoObj, Long userId) {
		User user = userRep.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found!"));
		ToDos todos = new ToDos();
		todos.setToDoList(toDoObj.getTitle());
		todos.setUser(user);
		List<Tasks> tasks = new ArrayList<>();
        if (toDoObj.getTasks() != null) {
            for (Tasks task : toDoObj.getTasks()) {
//                Task task = new Task();
//                task.setDescription(taskDTO.getDescription());
//                task.setTodo(todo);
            	System.out.println(task);
            	task.setToDos(todos);
            	task.addTodo(todos);
            	taskRep.save(task);
                tasks.add(task);
            }
        }
        else {
        	System.out.println("TaskList is empty");
        }
		
        todos.setTasksList(tasks);
        todos.addUser(user);
        listRep.save(todos);
        user.getToDos().add(todos);
        userRep.save(user);
//		toDoList.setUser(user);
//		listRep.save(toDoList);
//	
//		user.getToDos().add(toDoList);
//		userRep.save(user);
		System.out.println(user.getToDos().toString());

		return "Success!";
	}

	@Override
	public String editList(TodoDTO dto) {
		ToDos todo = listRep.findById(dto.getTodoId()).orElseThrow(() -> new ListIdNotFoundException("List not found!")); 
		todo.setToDoList(dto.getTitle());
		todo.setListMarked(dto.isListMarked());
//		todo.setTasksList(dto.getTasks());
		List<Tasks> taskList = dto.getTasks();
		for( Tasks t : taskList) {
			Tasks task = taskRep.findById(t.getTaskId()).orElseThrow( () -> new TaskNotFoundException("Task not found!"));
			System.out.println("Task id fetched inside todo is: "+ t.getTaskId());
			task.setTask(t.getTask());
			System.out.println("Task string fetched inside todo is: "+ t.getTask());
			task.setTaskMarked(t.isTaskMarked());
			System.out.println("Task marked fetched inside todo is: "+ t.isTaskMarked());
		}
		
		
//			ToDos todo = listRep.findById(todoId).orElseThrow(() -> new ListIdNotFoundException("List not found!"));
//			System.out.println("Todo id fetched: " + todo.getToDoListId());
//			todo.setToDoList(newToDo);
			return "Success!";
	}

	@Override
	public String deleteList(Long id) {
		if(listRep.existsById(id)) {
			System.out.println("inside deletelist and todo exitsts");
			taskService.deleteTaskList(id);
			listRep.deleteListById(id);
			return "Success!";
		}
		else {
			throw new ListIdNotFoundException("To Do List not exists!");
		}
//		Optional<ToDos> todoOpt = listRep.findById(id);
//		if(todoOpt.isPresent()) {
//			ToDos todo = todoOpt.get();
//			listRep.delete(todo);
//			return "success";
//		}
//		return "failed";
		
		
	}

	@Override
	public String markTodoTrue(Long id) {
		ToDos todo = listRep.findById(id).orElseThrow(() -> new ListIdNotFoundException("List not found!"));
//		System.out.println("Todo id fetched: " + todo.getToDoListId());
		todo.setListMarked(true);
		return "Success!";
	}
	
	@Override
	public String markTodoFalse(Long id) {
		ToDos todo = listRep.findById(id).orElseThrow(() -> new ListIdNotFoundException("List not found!"));
//		System.out.println("Todo id fetched: " + todo.getToDoListId());
		todo.setListMarked(false);
		return "Success!";
	}

	

}
