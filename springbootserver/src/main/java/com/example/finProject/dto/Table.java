package com.example.finProject.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Table {

	private int tno;
	private int eno;
	private int seat_num;
	private char window_seat;
	private int like;
	private char state;
	private int ocode;
	public int getTno() {
		return tno;
	}
	public void setTno(int tno) {
		this.tno = tno;
	}
	public int getEno() {
		return eno;
	}
	public void setEno(int eno) {
		this.eno = eno;
	}
	public int getSeat_num() {
		return seat_num;
	}
	public void setSeat_num(int seat_num) {
		this.seat_num = seat_num;
	}
	public char getWindow_seat() {
		return window_seat;
	}
	public void setWindow_seat(char window_seat) {
		this.window_seat = window_seat;
	}
	public int getLike() {
		return like;
	}
	public void setLike(int like) {
		this.like = like;
	}
	public char getState() {
		return state;
	}
	public void setState(char state) {
		this.state = state;
	}
	public int getOcode() {
		return ocode;
	}
	public void setOcode(int ocode) {
		this.ocode = ocode;
	}
}
