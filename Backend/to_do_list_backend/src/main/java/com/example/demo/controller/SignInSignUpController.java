package com.example.demo.controller;


import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.AuthRequest;
import com.example.demo.dto.AuthResponse;
import com.example.demo.entity.User;
import com.example.demo.jwt_utils.JwtUtils;
import com.example.demo.service.CustomUserDetails;
import com.example.demo.service.UserService;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@Slf4j
public class SignInSignUpController {
	
	@Autowired
	private JwtUtils utils;
	// dep : Auth mgr
	@Autowired
	private AuthenticationManager manager;
	// dep : user service for handling users
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper mapper;
	
	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid AuthRequest request){
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
		log.info("auth token " + authToken);
		
		Authentication authentication = manager.authenticate(authToken);
		log.info("auth token again " + authentication.getPrincipal().getClass());
		CustomUserDetails userDetails=(CustomUserDetails)authentication.getPrincipal();
		User user = userDetails.getUser();
		AuthResponse resp = mapper.map(user,AuthResponse.class);
		resp.setToken(utils.generateJwtToken(authentication));
		// => auth succcess
		return ResponseEntity.ok(resp);
	}
	
	
	
	@PostMapping("/signup")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid User user){
		System.out.println("in reg user : user " );
		// invoke service layer method , for saving : user info + associated roles info
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.addUserDetails(user));
	}

}
