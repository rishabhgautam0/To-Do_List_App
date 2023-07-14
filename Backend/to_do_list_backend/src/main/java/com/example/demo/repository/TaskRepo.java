package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Tasks;
import com.example.demo.entity.ToDos;

public interface TaskRepo extends JpaRepository<Tasks, Long>{
	
	@Query("select t.toDos from Tasks t where taskId = ?1")
	ToDos findTodoIdByTaskId(Long taskId);
	
	@Modifying
	@Query("delete from Tasks t where t.taskId = ?1")
	void deleteTaskById(Long id);

}
