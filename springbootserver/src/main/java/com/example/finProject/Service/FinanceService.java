package com.example.finProject.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.finProject.dto.ReportView;
import com.example.finProject.mapper.FinanceMapper;

@Service
public class FinanceService {
	@Autowired
	FinanceMapper mapper;
	
	String[] pt = {"Year", "Custom Period"};
	
	public Map<String,Object> getSalesByYear(int eno, String startPeriod, String endPeriod){
		Map<String,Object> map = new HashMap<>();
		List<Integer> labelList = new ArrayList<Integer>();
		List<Integer> salesList = new ArrayList<Integer>();
		int startYear = Integer.parseInt(startPeriod);
		int endYear = Integer.parseInt(endPeriod);
		
		if(startYear > endYear) {
			int temp = startYear;
			startYear = endYear;
			endYear = temp;
		}
		
		for (int i = startYear; i<= endYear; i++) {
			Object obj = mapper.getSalesByYear(eno, i);
			if(obj != null) {
				labelList.add(i);
				salesList.add(((BigDecimal)obj).intValue());
			}
		}
			map.put("label", labelList);
			map.put("sales", salesList);

		return map;
	}
	
	public Map<String,Object> getSalesByQuater(int eno, String startPeriod, String endPeriod){
		Map<String,Object> map = new HashMap<>();
		List<String> labelList = new ArrayList<String>();
		List<Integer> salesList = new ArrayList<Integer>();
		int startYear = Integer.parseInt(startPeriod);
		int endYear = Integer.parseInt(endPeriod);
		
		if(startYear > endYear) {
			int temp = startYear;
			startYear = endYear;
			endYear = temp;
		}
		
		for (int i = startYear; i<= endYear; i++) {
			Object[] obj = new Object[4];
			obj[0] = mapper.getSalesByQuater(eno, 1,3,i);
			obj[1] = mapper.getSalesByQuater(eno, 4,6,i);
			obj[2] = mapper.getSalesByQuater(eno, 7,9,i);
			obj[3] = mapper.getSalesByQuater(eno, 10,12,i);
			
			if (obj[0] != null) {
				labelList.add(i + " 1분기");
				salesList.add(((BigDecimal) obj[0]).intValue());
			}
			if (obj[1] != null) {
				labelList.add(i + " 2분기");
				salesList.add(((BigDecimal) obj[1]).intValue());
			}
			if (obj[2] != null) {
				labelList.add(i + " 3분기");
				salesList.add(((BigDecimal) obj[2]).intValue());
			}
			if (obj[3] != null) {
				labelList.add(i + " 4분기");
				salesList.add(((BigDecimal) obj[3]).intValue());
			}
		}
			map.put("label", labelList);
			map.put("sales", salesList);
		return map;
	}
	
	public Map<String,Object> getSalesByMonth(int eno, String periodType, String startPeriod, String endPeriod){
		Map<String,Object> map = new HashMap<>();
		List<String> labelList = new ArrayList<String>();
		List<Integer> salesList = new ArrayList<Integer>();
		
		if(biggerDate(startPeriod,endPeriod)) {
			String temp = startPeriod;
			startPeriod = endPeriod;
			endPeriod = temp;
		}
		
		if(periodType.equals("Year")) {
			int startYear = Integer.parseInt(startPeriod);
			int endYear = Integer.parseInt(endPeriod);
			
			for (int i = startYear; i<= endYear; i++) {
				Object[] obj = new Object[12];
				
				for(int j = 0; j < 12; j++) {
					obj[j] = mapper.getSalesByMonth(eno, j+1,i);
					if (obj[j] != null) {
						labelList.add(i + "년 "+ (j+1) +"월");
						salesList.add(((BigDecimal) obj[j]).intValue());
					}
				}
			}
		} else if(periodType.equals("Custom Period")) {
			String[] startArr = startPeriod.split("-");
			String[] endArr = endPeriod.split("-");
			int[] start = {Integer.parseInt(startArr[0]),Integer.parseInt(startArr[1])};
			int[] end = {Integer.parseInt(endArr[0], Integer.parseInt(endArr[1]))};
			
			for(int i = start[0]; i < end[0]; i++ ) {
				Object[] obj = new Object[12];
				
				for(int j =0; j<12; j++) {
					if(start[0] == i && start[1] > j+1) {
						continue;
					} else if(end[0] == i && end[1] < j+1) {
						continue;
					}
					
					obj[j] = mapper.getSalesByMonth(eno, j+1,i);
					if (obj[j] != null) {
						labelList.add(i + " "+ j +"월");
						salesList.add(((BigDecimal) obj[j]).intValue());
					}
				}
			}
		}
			map.put("label", labelList);
			map.put("sales", salesList);
			
		return map;
	}
	
	public Map<String,Object> getSalesByTime(int eno, String periodType, String startPeriod, String endPeriod){
		Map<String,Object> map = new HashMap<>();
		List<String> labelList = new ArrayList<String>();
		List<Integer> salesList = new ArrayList<Integer>();
		
		if(biggerDate(startPeriod,endPeriod)) {
			String temp = startPeriod;
			startPeriod = endPeriod;
			endPeriod = temp;
		}
		
		if(periodType.equals("Year")) {
			Object[] obj = new Object[24];
			for (int i = 0; i < 24; i++) {
				obj[i] = mapper.getSalesByTimeY(eno, i, startPeriod, endPeriod);
				if (obj[i] != null) {
					labelList.add(i + "~" + (i + 1));
					salesList.add(((BigDecimal) obj[i]).intValue());
				}
			}
		} else if(periodType.equals("Custom Period")) {
			Object[] obj = new Object[16];
			
			for (int i = 0; i < 24; i++) {
				obj[i] = mapper.getSalesByTimeC(eno, i, startPeriod, endPeriod);
				if (obj[i] != null) {
					labelList.add(i + "~" + (i + 1));
					salesList.add(((BigDecimal) obj[i]).intValue());
				}
			}
		}
		map.put("label", labelList);
		map.put("sales", salesList);
			
		return map;
	}
	
	public Map<String,Object> getMenuSalesByYear(int eno, String startPeriod, String endPeriod, String menu){
		Map<String,Object> map = new HashMap<>();
		List<Integer> labelList = new ArrayList<Integer>();
		List<Integer> salesList = new ArrayList<Integer>();
		int startYear = Integer.parseInt(startPeriod);
		int endYear = Integer.parseInt(endPeriod);
		
		if(startYear > endYear) {
			int temp = startYear;
			startYear = endYear;
			endYear = temp;
		}
		
		for (int i = startYear; i<= endYear; i++) {
			Object obj = mapper.getMenuSalesByYear(eno, i, menu);
			if(obj != null) {
				labelList.add(i);
				salesList.add(((BigDecimal)obj).intValue());
			}
		}
			map.put("label", labelList);
			map.put("sales", salesList);
		return map;
	}
	
	public Map<String,Object> getMenuSalesByQuater(int eno, String startPeriod, String endPeriod, String menu){
		Map<String,Object> map = new HashMap<>();
		List<String> labelList = new ArrayList<String>();
		List<Integer> salesList = new ArrayList<Integer>();
		int startYear = Integer.parseInt(startPeriod);
		int endYear = Integer.parseInt(endPeriod);
		
		if(startYear > endYear) {
			int temp = startYear;
			startYear = endYear;
			endYear = temp;
		}
		
		for (int i = startYear; i<= endYear; i++) {
			Object[] obj = new Object[4];
			obj[0] = mapper.getMenuSalesByQuater(eno,1,3,i,menu);
			obj[1] = mapper.getMenuSalesByQuater(eno,4,6,i,menu);
			obj[2] = mapper.getMenuSalesByQuater(eno,7,9,i,menu);
			obj[3] = mapper.getMenuSalesByQuater(eno,10,12,i,menu);
			
			if (obj[0] != null) {
				labelList.add(i + " 1분기");
				salesList.add(((BigDecimal) obj[0]).intValue());
			}
			if (obj[1] != null) {
				labelList.add(i + " 2분기");
				salesList.add(((BigDecimal) obj[1]).intValue());
			}
			if (obj[2] != null) {
				labelList.add(i + " 3분기");
				salesList.add(((BigDecimal) obj[2]).intValue());
			}
			if (obj[3] != null) {
				labelList.add(i + " 4분기");
				salesList.add(((BigDecimal) obj[3]).intValue());
			}
		}
			map.put("label", labelList);
			map.put("sales", salesList);
		return map;
	}
	
	public Map<String,Object> getMenuSalesByMonth(int eno, String periodType, String startPeriod, String endPeriod, String menu){
		Map<String,Object> map = new HashMap<>();
		List<String> labelList = new ArrayList<String>();
		List<Integer> salesList = new ArrayList<Integer>();
		
		if(biggerDate(startPeriod,endPeriod)) {
			String temp = startPeriod;
			startPeriod = endPeriod;
			endPeriod = temp;
		}
		
		if(periodType.equals("Year")) {
			int startYear = Integer.parseInt(startPeriod);
			int endYear = Integer.parseInt(endPeriod);
			
			for (int i = startYear; i<= endYear; i++) {
				Object[] obj = new Object[12];
				
				for(int j = 0; j < 12; j++) {
					obj[j] = mapper.getMenuSalesByMonth(eno, j+1,i,menu);
					if (obj[j] != null) {
						labelList.add(i + " "+ j +"월");
						salesList.add(((BigDecimal) obj[j]).intValue());
					}
				}
			}
		} else if(periodType.equals("Custom Period")) {
			String[] startArr = startPeriod.split("-");
			String[] endArr = endPeriod.split("-");
			int[] start = {Integer.parseInt(startArr[0]),Integer.parseInt(startArr[1])};
			int[] end = {Integer.parseInt(endArr[0], Integer.parseInt(endArr[1]))};
			
			for(int i = start[0]; i < end[0]; i++ ) {
				Object[] obj = new Object[12];
				
				for(int j =0; j<12; j++) {
					if(start[0] == i && start[1] > j+1) {
						continue;
					} else if(end[0] == i && end[1] < j+1) {
						continue;
					}
					
					obj[j] = mapper.getMenuSalesByMonth(eno, j+1,i,menu);
					if (obj[j] != null) {
						labelList.add(i + " "+ j +"월");
						salesList.add(((BigDecimal) obj[j]).intValue());
					}
				}
			}
		}
			map.put("label", labelList);
			map.put("sales", salesList);
			
		return map;
	}
	
	public Map<String,Object> getMenuSalesByTime(int eno, String periodType, String startPeriod, String endPeriod, String menu){
		Map<String,Object> map = new HashMap<>();
		List<String> labelList = new ArrayList<String>();
		List<Integer> salesList = new ArrayList<Integer>();
		
		if(biggerDate(startPeriod,endPeriod)) {
			String temp = startPeriod;
			startPeriod = endPeriod;
			endPeriod = temp;
		}
		
		if(periodType.equals("Year")) {
			Object[] obj = new Object[24];
			for (int i = 0; i < 24; i++) {
				obj[i] = mapper.getMenuSalesByTimeY(eno, i, startPeriod, endPeriod, menu);
				if (obj[i] != null) {
					labelList.add(i + "~" + (i + 1));
					salesList.add(((BigDecimal) obj[i]).intValue());
				}
			}
		} else if(periodType.equals("Custom Period")) {
			Object[] obj = new Object[16];
			
			for (int i = 0; i < 24; i++) {
				obj[i] = mapper.getMenuSalesByTimeC(eno, i, startPeriod, endPeriod, menu);
				if (obj[i] != null) {
					labelList.add(i + "~" + (i + 1));
					salesList.add(((BigDecimal) obj[i]).intValue());
				}
			}
		}
		map.put("label", labelList);
		map.put("sales", salesList);
			
		return map;
	}
	
	public Map<String,List<ReportView>> getSalesList(int eno, String startPeriod, String endPeriod){
		Map<String,List<ReportView>> map = new HashMap<>();
		List<ReportView> list = null;
		List<ReportView> temp = null;
		LocalDate compare = LocalDate.of(2000, 01, 01);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		
		temp = mapper.getSalesReport(eno, startPeriod, endPeriod);
		
		for(ReportView rv : temp) {
			LocalDate rvDate = LocalDateTime.parse(rv.getOtime(), formatter).toLocalDate();
			if(compare.isEqual(rvDate)) {
				list.add(rv);
			} else {
				compare = rvDate;
				list = new ArrayList<>();
				list.add(rv);
				map.put(compare.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),list);
			}
		}
		
		map.put(compare.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),list);
			
		return map;
	}
	
	public Map<String,List<ReportView>> getMenuSalesList(int eno, String startPeriod, String endPeriod, String menu){
		Map<String,List<ReportView>> map = new HashMap<>();
		List<ReportView> list = null;
		List<ReportView> temp = null;
		LocalDate compare = LocalDate.of(2000, 01, 01);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		
		temp = mapper.getMenuSalesReport(eno, startPeriod, endPeriod, menu);
		
		for(ReportView rv : temp) {
			LocalDate rvDate = LocalDateTime.parse(rv.getOtime(), formatter).toLocalDate();
			if(compare.isEqual(rvDate)) {
				list.add(rv);
			} else {
				compare = rvDate;
				list = new ArrayList<>();
				list.add(rv);
				map.put(compare.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),list);
			}
		}
		
		map.put(compare.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")),list);
			
		return map;
	}
	
	
	public boolean biggerDate(String startDate, String endDate) {
		return Integer.parseInt(startDate.replace("-", "")) > Integer.parseInt(endDate.replace("-", ""));
	}
}
