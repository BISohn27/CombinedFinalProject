package com.example.finProject.dto;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Enterprise {

	private int eno;
	private String password;
	private String ename;
	private String postcode;
	private String road_address;
	private String jibun_address;
	private String detail_address;
	private String phone;
	private String email;
	private char confirm;
	private String introduction;
	private int open1;
	private int close1;
	private int open2;
	private int close2;
	private char valid;
	private String eimage;
	private String ecategory;
	private Timestamp modification_time;
	
	public int getEno() {
		return eno;
	}

	public void setEno(int eno) {
		this.eno = eno;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getRoad_address() {
		return road_address;
	}

	public void setRoad_address(String road_address) {
		this.road_address = road_address;
	}

	public String getJibun_address() {
		return jibun_address;
	}

	public void setJibun_address(String jibun_address) {
		this.jibun_address = jibun_address;
	}

	public String getDetail_address() {
		return detail_address;
	}

	public void setDetail_address(String detail_address) {
		this.detail_address = detail_address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public char getConfirm() {
		return confirm;
	}

	public void setConfirm(char confirm) {
		this.confirm = confirm;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public int getOpen1() {
		return open1;
	}

	public void setOpen1(int open1) {
		this.open1 = open1;
	}

	public int getClose1() {
		return close1;
	}

	public void setClose1(int close1) {
		this.close1 = close1;
	}

	public int getOpen2() {
		return open2;
	}

	public void setOpen2(int open2) {
		this.open2 = open2;
	}

	public int getClose2() {
		return close2;
	}

	public void setClose2(int close2) {
		this.close2 = close2;
	}

	public char getValid() {
		return valid;
	}

	public void setValid(char valid) {
		this.valid = valid;
	}

	public String getEimage() {
		return eimage;
	}

	public void setEimage(String eimage) {
		this.eimage = eimage;
	}

	public String getEcategory() {
		return ecategory;
	}

	public void setEcategory(String ecategory) {
		this.ecategory = ecategory;
	}

	public Timestamp getModification_time() {
		return modification_time;
	}

	public void setModification_time(Timestamp modification_time) {
		this.modification_time = modification_time;
	}

	public Enterprise() {}
}
