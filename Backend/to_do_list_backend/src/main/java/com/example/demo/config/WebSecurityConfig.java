package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.demo.filter.JWTRequestFilter;

import jakarta.servlet.http.HttpServletResponse;

@EnableWebSecurity
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {

	@Autowired
	private JWTRequestFilter filter;
	
	@Bean
	public PasswordEncoder encoder() {
		return new BCryptPasswordEncoder();
	}
	
	@SuppressWarnings({ "deprecation", "removal" })
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.cors()
		.and()
		.csrf().disable()
		.exceptionHandling().authenticationEntryPoint((request, response, ex) -> {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED, ex.getMessage());
		})
		.and()
		.authorizeRequests()
		.requestMatchers("/auth/**", "/postman*/**", "/v*/api-docs/**").permitAll().
		
		anyRequest().authenticated()
		.and()
		.sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and()
		.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

       return http.build();

	}
	
	// configure auth mgr bean : to be used in SignInSignUp REST controller
	@Bean
	public AuthenticationManager authenticatonMgr(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
	
	//for global CORS enabling
		@Bean
		public WebMvcConfigurer corsConfigurer() {
			return new WebMvcConfigurer() {
				@Override
				public void addCorsMappings(CorsRegistry registry) {
					registry.addMapping("/**").allowedOrigins("https://to-do-lists-webapp.netlify.app").allowedMethods("*");
				}
			};
		}
	

}
