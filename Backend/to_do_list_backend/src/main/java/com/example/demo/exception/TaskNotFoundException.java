package com.example.demo.exception;

@SuppressWarnings("serial")
public class TaskNotFoundException extends RuntimeException{
	
	public TaskNotFoundException(String msg) {
		super(msg);
	}

}
