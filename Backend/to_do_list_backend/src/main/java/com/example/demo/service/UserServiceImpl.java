package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exception.UserAlreadyExistsException;
import com.example.demo.exception.UserNotFoundException;
import com.example.demo.repository.UserRepo;

@Service
@Transactional
public class UserServiceImpl implements UserService{
	
	@Autowired
	UserRepo userRep;
	
	@Autowired
	private PasswordEncoder enc;
	

	@Override
	public User addUserDetails(User user) {

		if(userRep.existsByEmail(user.getEmail())) {
			throw new UserAlreadyExistsException("Email already exits");
		}
		user.setRole(Role.valueOf("ROLE_USER"));
		user.setPassword(enc.encode(user.getPassword()));
		
		return userRep.save(user);
	}

	@Override
	public User getUserById(Long id) {
		return userRep.findById(id).orElseThrow(() -> new UserNotFoundException("User with id " + id + "does not exist"));
	}



}
