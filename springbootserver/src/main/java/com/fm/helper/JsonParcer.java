package com.fm.helper;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

@Component
public class JsonParcer {
	
	public Map<String,String> getJsonData(String[] key,String param) {
		Map<String,String> map = new HashMap<>(); 
		JsonElement element = JsonParser.parseString(param);
		JsonObject object = element.getAsJsonObject();
		
		for(String str : key) {
			map.put(str, object.get(str).getAsString());
		}
		
		return map;
	}
}
