package com.example.finProject.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Order {

	private int ocode;
	private int eno;
	private Timestamp otime;
	private char payment;
	private int total;
	private Timestamp ptime;
}
