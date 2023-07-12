package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Tasks;
import com.example.demo.entity.ToDos;

public interface ListRepo extends JpaRepository<ToDos, Long>{
	
	@Query("select t.tasksList from ToDos t where t.toDoListId =?1")
	List<Tasks> findByListId(Long id);

}
