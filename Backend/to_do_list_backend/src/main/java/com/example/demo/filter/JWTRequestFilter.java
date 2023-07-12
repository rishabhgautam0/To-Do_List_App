package com.example.demo.filter;

import java.io.IOException;
import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.jwt_utils.JwtUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JWTRequestFilter extends OncePerRequestFilter{
	
	
	@Autowired
	private JwtUtils utils;
	
	@Autowired
	private UserDetailsService userDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
//		String header1 = request.getRequestURI();
//		Enumeration<String> reqBody = request.getHeaderNames();
//		while (reqBody.hasMoreElements()) {
//		    String param = reqBody.nextElement();
//		    log.info(param);
//		}
		String header = request.getHeader("authorization");
		log.info(header);
		if (header != null && header.startsWith("Bearer ")) {
			// Bearer token present --> extract n validate it
			String token = header.substring(7);
			if (utils.validateJwtToken(token)) {
				// valid token --> extract user name(email) from the token
				String userName = utils.getUserNameFromJwtToken(token);
				System.out.println(userName);
				if (userName != null && SecurityContextHolder.getContext().getAuthentication() == null) {
					// load user details from UserDetailsService
					UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
			//		System.out.println("granted auths "+ utils.getAuthoritiesFromJwtToken(token));
					// create Authentication object , wrapping user details lifted from DB
					UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							userDetails, null,userDetails.getAuthorities());
					// set details in authentication object. Above ctor sets authentication flag to
					// true => user already authenticated , so that other filters in the chain
					// should not attempt auth again
//					Save this authentication token in the sec ctx.
					SecurityContextHolder.getContext().setAuthentication(authentication);
				} else
					log.info("user name null or authentication already set , username {}", userName);

			}
		} else
			log.error("Request header DOES NOT contain a Bearer Token");
		// pass the request to the next filter in the chain
		filterChain.doFilter(request, response);

	}
	
	

}
