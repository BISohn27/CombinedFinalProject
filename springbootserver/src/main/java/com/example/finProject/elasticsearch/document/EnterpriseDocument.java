package com.example.finProject.elasticsearch.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

import com.example.finProject.elasticsearch.helper.Indices;

//엘라스틱 서치 인덱스 내에 생성되는 데이터베이스에서 row 역할(json 객체 단위로 생성)
@Document(indexName=Indices.ENTERPRISE_INDEX)
@Setting(settingPath = "static/es-settings.json")
public class EnterpriseDocument {
	@Id
	@Field(type=FieldType.Integer)
	private int eno;
	@Field(type = FieldType.Text)
	private String ename;
	@Field(type = FieldType.Text)
	private String postcode;
	@Field(type = FieldType.Text)
	private String road_address;
	@Field(type = FieldType.Text)
	private String jibun_address;
	@Field(type = FieldType.Text)
	private	String detail_address;
	@Field(type = FieldType.Text)
	private String phone;
	@Field(type = FieldType.Text)
	private String email;
	@Field(type = FieldType.Text)
	private String introduction;
	@Field(type = FieldType.Integer)
	private int open1;
	@Field(type = FieldType.Integer)
	private int close1;
	@Field(type = FieldType.Integer)
	private int open2;
	@Field(type = FieldType.Integer)
	private int close2;
	@Field(type = FieldType.Text)
	private String eimage;
	@Field(type = FieldType.Keyword)
	private String ecategory;
	@Field(type= FieldType.Integer)
	private int seat;
	@Field(type= FieldType.Integer)
	private int occupied;
	
	public int getSeat() {
		return seat;
	}
	public void setSeat(int seat) {
		this.seat = seat;
	}
	public int getOccupied() {
		return occupied;
	}
	public void setOccupied(int occupied) {
		this.occupied = occupied;
	}
	public int getEno() {
		return eno;
	}
	public void setEno(int eno) {
		this.eno = eno;
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
	
}
