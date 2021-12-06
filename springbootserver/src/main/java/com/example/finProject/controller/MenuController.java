package com.example.finProject.controller;

import java.io.File;
import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.finProject.Service.FilenameGenerator;
import com.example.finProject.dto.Menu;
import com.example.finProject.mapper.MenuMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value="/enterprises/{eno}/menus", produces="application/json;charset=utf8")
public class MenuController {
	
	@Autowired
	private MenuMapper mapper;
	
	@Autowired
	private FilenameGenerator fileNameGen;

	@PostMapping("")
	public String menu(@PathVariable("eno") int eno,
			@RequestParam("files")MultipartFile file,
			@RequestParam("data")String param) {
		// 파일 받기
		String fileName = fileNameGen.getFilename(file.getOriginalFilename());
		String absPath = new File("").getAbsolutePath() + "\\src\\main\\resources\\static\\img\\" + fileName;
		String urlPath = fileNameGen.getImageURL(fileName);
		
		JsonObject result = new JsonObject();
		result.addProperty("status", false);
		Gson gson = new Gson();
		
		try {
			JsonObject json = gson.fromJson(param, JsonObject.class);
//			System.out.println(json);
			
			mapper.POSTmenu(eno, json.get("mname").getAsString(), json.get("price").getAsInt(),
					json.get("mcomment").getAsString(), urlPath, json.get("mcategory").getAsString());
			
			int mcode = mapper.POSTmenuResponse(eno, json.get("mname").getAsString());
			
			// 파일 업로드
			file.transferTo(new File(absPath));
			
			result.addProperty("mcode", mcode);
			result.addProperty("status", true);
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return result.toString();
	}

	
	
	@GetMapping("/{mcode}")
	public Menu getMenu(@PathVariable("eno") int eno, @PathVariable("mcode") int mcode) {
		Menu menu = mapper.GETmenu(mcode);
		
		return menu;
	}

	@PutMapping("/{mcode}")
	public String putEnterprise(@PathVariable("eno") int eno, @PathVariable("mcode") int mcode, @RequestBody String param) {
		JsonObject result = new JsonObject();
		result.addProperty("status", false);
		Gson gson = new Gson();
		
		try {
			Menu menu = mapper.GETmenu(mcode);
			String tempJson = gson.toJson(menu);
			JsonObject insertJson = gson.fromJson(tempJson, JsonObject.class);
			JsonObject json = gson.fromJson(param, JsonObject.class);
			
			Type type = new TypeToken<Map<String, Object>>() {}.getType();
			Map<String, Object> nullRemover = gson.fromJson(param, type);
			
			for( Iterator<Map.Entry<String, Object>> it = nullRemover.entrySet().iterator(); it.hasNext();) {
				Map.Entry<String,Object> entry = it.next();
				String key =entry.getKey();
				if(key.equals("mcode"))
					continue;
				else if(entry.getValue() == null)
					continue;
				else {
					if (insertJson.get(key).getAsJsonPrimitive().isBoolean())
						insertJson.addProperty(key, json.get(key).getAsBoolean());
					else if (insertJson.get(key).getAsJsonPrimitive().isNumber())
						insertJson.addProperty(key, json.get(key).getAsInt());
					else
						insertJson.addProperty(key, json.get(key).getAsString());
				}
			}
//			Iterator<String> iterator = json.keySet().iterator();
//			while (iterator.hasNext()) {
//				String key = iterator.next();
//				if (key.equals("mcode"))
//					continue;
//				// 넘겨 받은 Json element의 타입에 따라서 설정.
//				// boolean의 경우 boolean으로, number의 경우 int로, 나머지는 string으로 받는다.
//				if (json.get(key).getAsJsonPrimitive().isBoolean())
//					insertJson.addProperty(key, json.get(key).getAsBoolean());
//				else if (json.get(key).getAsJsonPrimitive().isNumber())
//					insertJson.addProperty(key, json.get(key).getAsInt());
//				else
//					insertJson.addProperty(key, json.get(key).getAsString());
//			}
			
			mapper.PUTmenu(eno, insertJson.get("mname").getAsString(), insertJson.get("price").getAsInt(),
				insertJson.get("mcomment").getAsString(), insertJson.get("mimage").getAsString(), 
				insertJson.get("mcategory").getAsString(), insertJson.get("mcode").getAsInt());
			
			result.addProperty("status", true);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return result.toString();
	}

	@DeleteMapping("/{mcode}")
	public String deleteEnterprise(@PathVariable("eno") int eno, @PathVariable("mcode") int mcode) {
		JsonObject result = new JsonObject();
		result.addProperty("status", false);
		try {
			mapper.DELETmenu(mcode);
			result.addProperty("status", true);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result.toString();
	}

}
