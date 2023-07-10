package com.example.demo.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "to_dos")
public class ToDos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "to_do_list_id")
	private Long toDoListId;
	
	@Column(name = "to_do_list")
	private String toDoList;
	
	@Column(name = "list_marked")
	private boolean listMarked;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;
	
	@JsonIgnore
	@OneToMany( mappedBy = "toDos",
			cascade = CascadeType.ALL,
			orphanRemoval = true,fetch = FetchType.EAGER)
	private List<Tasks> tasksList = new ArrayList<>();
	
	
}
