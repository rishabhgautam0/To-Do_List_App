package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.ToDos;
import com.example.demo.entity.User;

public interface UserRepo extends JpaRepository<User, Long>{
	
	boolean existsByEmail(String email);
	
	Optional<User> findByEmail(String email);
	
	@Query("select t.toDos from User t where t.userId =?1")
	List<ToDos> findByUserId(Long id);

}
