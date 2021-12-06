package com.example.finProject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.finProject.dto.Enterprise;
import com.example.finProject.elasticsearch.document.EnterpriseDocument;
import com.example.finProject.elasticsearch.service.EnterpriseService;
import com.example.finProject.mapper.BaseMapper;
import com.example.finProject.mapper.TableMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value="", produces="application/json;charset=utf8")
public class BaseController {
	private final EnterpriseService service;
	@Autowired
	private BaseMapper mapper;
	@Autowired
	private TableMapper tableMapper;
	
	@Autowired
	public BaseController(EnterpriseService service) {
		this.service= service;
	}

	// 로그인 컨트롤러
	@PostMapping("/login")
	public String login(@RequestBody String param) {
		JsonObject result = new JsonObject();

		Gson gson = new Gson();
		Enterprise ent = null;
		try {
			JsonObject json = gson.fromJson(param, JsonObject.class);
			System.out.println(json);
			
			ent = mapper.Login(json.get("eno").getAsInt(), json.get("password").getAsString());
			
			if(ent != null) {
				result.addProperty("status", true);
			}else {
				result.addProperty("status", false);
			}
				
		}catch(Exception e) {
			
		}
		return result.toString();
	}

	// 검색된 업체들 가져오기
	@GetMapping("/enterprises")
	public ResponseEntity<List<EnterpriseDocument>> findBusinessBySearchInCafe(@RequestParam(value = "q") String q,
			@RequestParam(value = "option") String option) {
		List<EnterpriseDocument> list = null;
		if (option.equals("undefined")) {
			list = service.findBusinessByKeyword(q);
		} else if (option.equals("rest")) {
			list = service.findBusinessByKeywordInRestaurant(q);
		} else if (option.equals("cafe")) {
			list = service.findBusinessByKeywordInCafe(q);
		} else {
			list = null;
		}

		if (list != null) {
			for (EnterpriseDocument business : list) {
				business.setSeat(tableMapper.getSeatNum(business.getEno()));
				business.setOccupied(tableMapper.getOccupiedNum(business.getEno()));
			}
		}
		return new ResponseEntity<>(list, HttpStatus.BAD_REQUEST.OK);
	}
}

//@GetMapping("/enterprises")
//public String getEnterprises() {
//	JsonObject result = new JsonObject();
//	Gson gson = new Gson();
//	
//	JsonArray jsonArr =new JsonArray();
//	Enterprise[] enterprises = mapper.GETenterprises();
//	for( Enterprise ent : enterprises) {
//		ent.setPassword(null);
//		JsonObject insertJson = gson.fromJson(gson.toJson(ent), JsonObject.class);
//		jsonArr.add(insertJson);
//	}
//	
//	result.add("enterprises", jsonArr);
//	
//	return result.toString();
//}
