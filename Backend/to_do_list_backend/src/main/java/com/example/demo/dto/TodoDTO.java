package com.example.demo.dto;

import java.util.List;

import com.example.demo.entity.Role;
import com.example.demo.entity.Tasks;
import com.example.demo.entity.ToDos;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TodoDTO {
	
	
	
	private String title;
	
	private List<Tasks> tasks;

}
