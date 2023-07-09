package com.example.demo.exception;

@SuppressWarnings("serial")
public class UserAlreadyExistsException extends RuntimeException{
	
	public UserAlreadyExistsException(String msg) {
		super(msg);
	}

}
