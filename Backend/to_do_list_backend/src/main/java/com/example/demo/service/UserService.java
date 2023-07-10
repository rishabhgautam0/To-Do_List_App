package com.example.demo.service;

import com.example.demo.entity.User;

public interface UserService {
	
	User addUserDetails(User user);
	
	User getUserById(Long id);

}
