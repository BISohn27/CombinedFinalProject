package com.example.finProject.controller;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.finProject.dto.Table;
import com.example.finProject.dto.TableView;
import com.example.finProject.mapper.OrderMapper;
import com.example.finProject.mapper.TableMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value="/enterprises/{eno}/tables", produces="application/json;charset=utf8")
public class TableController {
	
	@Autowired
	private TableMapper mapper;
	@Autowired
	private OrderMapper oMapper;

	@PostMapping("")
	public String table(@PathVariable("eno") int eno, @RequestBody String param) {
		JsonObject result = new JsonObject();
		result.addProperty("status", false);
		Gson gson = new Gson();
		
		try {
			JsonObject json = gson.fromJson(param, JsonObject.class);
			System.out.println(json);
			
			mapper.POSTtable(eno, json.get("seat_num").getAsInt(), json.get("window_seat").getAsString().charAt(0));
			
			int tno = mapper.POSTtableResponse(eno);
			
			result.addProperty("tno", tno);
			result.addProperty("status", true);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return result.toString();
	}
		//get occupied table by table view(mysql)
		@GetMapping("/order")
		public ResponseEntity<Map<String,List<TableView>>> getTableView(@PathVariable("eno")int eno){
			List<TableView> list = null;
			Map<String,List<TableView>> map = new HashMap<>();
			try {
				list = mapper.getOccupiedTables(eno);
				int seat_num = 0;
				
				if(list != null) {
					List<TableView> tempList = null;
					for(TableView tv : list) {
						if(tv.getSeat_num() == seat_num) {
							tempList.add(tv);
						} else {
							if(seat_num != 0) {
								map.put(String.valueOf(seat_num), tempList);
							}
							seat_num = tv.getSeat_num();
							tempList = new ArrayList<>();
							tempList.add(tv);
						}
					}
					map.put(String.valueOf(seat_num), tempList);
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
			if(!map.isEmpty()) {
				return new ResponseEntity<Map<String,List<TableView>>>(map,HttpStatus.BAD_REQUEST.OK);
			}else {
				return new ResponseEntity<Map<String,List<TableView>>>(map,HttpStatus.BAD_REQUEST.OK);
			}
		}
	
	@PostMapping("/{tno}/order")
	public ResponseEntity<Integer> updateTableOrder(@PathVariable("eno")int eno, @PathVariable("tno")int tno, @RequestBody String param) {
		JsonObject result = new JsonObject();
		result.addProperty("status", false);
		Gson gson = new Gson();
		int state = 0;
		System.out.println(eno);
		try {
			JsonObject json = gson.fromJson(param, JsonObject.class);
			state = mapper.updateTable(eno, tno, json.get("ocode").getAsInt());
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		if(state == 1) {
			return new ResponseEntity<Integer>(1, HttpStatus.BAD_REQUEST.OK);
		}else {
			return new ResponseEntity<Integer>(0, HttpStatus.BAD_REQUEST.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PostMapping("/{tno}/pay")
	public ResponseEntity<Integer> pay(@PathVariable("eno")int eno, @PathVariable("tno")int tno){
		int oState = 0;
		int tState = 0;
		try {
			int ocode = mapper.GETtable(tno,eno).getOcode();
			oState = oMapper.payment(ocode);
			tState = mapper.updateTablePay(eno, tno);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		if(oState == 1 && tState == 1) {
			return new ResponseEntity<Integer>(1, HttpStatus.BAD_REQUEST.OK);
		}else {
			return new ResponseEntity<Integer>(0, HttpStatus.BAD_REQUEST.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/{tno}")
	public Table getTable(@PathVariable("eno") int eno, @PathVariable("tno") int tno) {
		Table table = mapper.GETtable(tno,eno);
		
		return table;
	}

	@PutMapping("/{tno}")
	public String putEnterprise(@PathVariable("eno") int eno, @PathVariable("tno") int tno, @RequestBody String param) {
		JsonObject result = new JsonObject();
		result.addProperty("status", false);
		Gson gson = new Gson();
		
		try {
			Table table = mapper.GETtable(tno,eno);
			String tempJson = gson.toJson(table);
			JsonObject insertJson = gson.fromJson(tempJson, JsonObject.class);
			JsonObject json = gson.fromJson(param, JsonObject.class);
			
			Type type = new TypeToken<Map<String, Object>>() {}.getType();
			Map<String, Object> nullRemover = gson.fromJson(param, type);
			
			for( Iterator<Map.Entry<String, Object>> it = nullRemover.entrySet().iterator(); it.hasNext();) {
				Map.Entry<String,Object> entry = it.next();
				String key =entry.getKey();
				if(key.equals("tno"))
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
//				if (key.equals("tno"))
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
			
			mapper.PUTtable(tno, eno, insertJson.get("seat_num").getAsInt(), insertJson.get("window_seat").getAsString().charAt(0), 
					insertJson.get("like").getAsInt(), insertJson.get("state").getAsString().charAt(0));
			
			result.addProperty("status", true);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return result.toString();
	}

	@DeleteMapping("/{tno}")
	public String deleteEnterprise(@PathVariable("eno") int eno, @PathVariable("tno") int tno) {
		JsonObject result = new JsonObject();
		result.addProperty("status", false);
		try {
			mapper.DELETEtable(tno);
			result.addProperty("status", true);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result.toString();
	}

}
