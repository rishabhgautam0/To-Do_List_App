package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
//import jakarta.persistence.Access;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private Long userId;
	
	@NotBlank(message = "First name can't be blank")
	@Length(min = 2, max = 20, message = "Invalid first name!!!!!!")
	@Column(name = "first_name")
	private String firstName;
	
	@NotBlank(message = "Last name can't be blank")
	@Length(min = 2, max = 20, message = "Invalid first name!!!!!!")
	@Column(name = "last_name")
	private String lastName;
	
	@Column(length = 50, unique = true)
	@Email(message = "Invalid email format")
	private String email;
	
	@Column(length = 300)
	@JsonProperty(access = Access.WRITE_ONLY)
	@Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}",message = "Invalid Password !")
	private String password;
	
	@JsonIgnore
	@OneToMany( mappedBy = "user",
			cascade = CascadeType.ALL,
			orphanRemoval = true,fetch = FetchType.EAGER)
	private List<ToDos> toDos = new ArrayList<>();
	
}
