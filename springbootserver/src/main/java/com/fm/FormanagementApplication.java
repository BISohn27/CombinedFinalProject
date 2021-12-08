package com.fm;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(value= {"com.fm.mapper"})
public class FormanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(FormanagementApplication.class, args);
	}

}
