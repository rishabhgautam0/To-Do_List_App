package com.example.demo.dto;

import java.util.List;

import com.example.demo.entity.Tasks;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TodoDTO {
	
	private long todoId;
	
	private String title;
	
	private List<Tasks> tasks;

		

}
