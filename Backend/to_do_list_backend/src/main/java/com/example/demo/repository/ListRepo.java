package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ToDos;

public interface ListRepo extends JpaRepository<ToDos, Long>{

}
