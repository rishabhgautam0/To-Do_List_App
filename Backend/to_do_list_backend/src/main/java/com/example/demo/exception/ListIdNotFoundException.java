package com.example.demo.exception;

@SuppressWarnings("serial")
public class ListIdNotFoundException extends RuntimeException{
	
	public ListIdNotFoundException(String msg) {
		super(msg);
	}

}
