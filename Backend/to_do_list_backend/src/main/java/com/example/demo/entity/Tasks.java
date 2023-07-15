package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Tasks {
	
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "task_id")
	private Long taskId;
	
	
	private String task;
	
	@Column(name = "task_marked")
	private boolean taskMarked;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "to_do_list_id")
	private ToDos toDos;
	
	public void addTodo(ToDos t) {
		toDos.setToDoListId(t.getToDoListId());
	}
	@Override
	public String toString() {
		return "Tasks [taskId=" + taskId + ", task=" + task + ", taskMarked=" + taskMarked + ", toDos=" + toDos + "]";
	}

}
