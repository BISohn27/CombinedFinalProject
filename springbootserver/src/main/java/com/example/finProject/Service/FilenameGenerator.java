package com.example.finProject.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.springframework.stereotype.Service;


@Service
public class FilenameGenerator {
	public String getFilename(String originFileName) {
		String fileName = "";
		String[] splitName = originFileName.split("\\.");
		
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		fileName = formatter.format(calendar.getTime()) + "." + splitName[splitName.length - 1];
		
		return fileName;
	}
	
	public String getImageURL(String fileName) {
		return "http://118.67.142.194:8080/img/"+fileName;
	}
}
