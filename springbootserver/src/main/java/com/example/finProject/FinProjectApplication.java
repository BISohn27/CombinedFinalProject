package com.example.finProject;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value= {"com.example.finProject.mapper"})
public class FinProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinProjectApplication.class, args);
	}

}
