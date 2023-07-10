package com.example.demo.dto;

import com.example.demo.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
	
	private Long userId;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private Role role;
	
	private String token;

}
