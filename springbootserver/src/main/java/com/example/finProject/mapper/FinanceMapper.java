package com.example.finProject.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.example.finProject.dto.ReportView;

@Mapper
public interface FinanceMapper {
	@Select("select sum(c.total) as sum from (select total from enterprise_report_view as e where e.eno=${eno} and (year(e.otime) = ${year}) group by ocode) as c")
	public Object getSalesByYear(@Param("eno")int eno, @Param("year")int year);
	@Select("select sum(c.total) as sum from (select total from enterprise_report_view as e where e.eno=${eno} and Year(otime) = ${year} and Month(otime) >= ${month1} and Month(otime) <= ${month2} group by ocode) as c")
	public Object getSalesByQuater(@Param("eno")int eno, @Param("month1")int month1, @Param("month2")int month2,@Param("year")int year);
	@Select("select sum(c.total) as sum from (select total from enterprise_report_view as e where e.eno=${eno} and Year(otime) = ${year} and Month(otime) =${month} group by ocode) as c")
	public Object getSalesByMonth(@Param("eno")int eno, @Param("month")int month1,@Param("year")int year);
	@Select("select sum(c.total) as sum from (select total from enterprise_report_view as e where e.eno=${eno} and (date_format(otime, '%H') = ${time}) and (Year(otime) between ${start} and ${end}) group by ocode) as c")
	public Object getSalesByTimeY(@Param("eno")int eno, @Param("time")int time,@Param("start")String start,@Param("end")String end);
	@Select("select sum(c.total) as sum from (select total from enterprise_report_view as e where e.eno=${eno} and (date_format(otime, '%H') = ${time}) and otime >= #{start} and otime <= #{end} group by ocode) as c")
	public Object getSalesByTimeC(@Param("eno")int eno, @Param("time")int time,@Param("start")String start,@Param("end")String end);
	
	@Select("select sum(count) from enterprise_report_view where eno=${eno} and mname=#{menu} and (year(otime) = ${year}) group by mname")
	public Object getMenuSalesByYear(@Param("eno")int eno, @Param("year")int year, @Param("menu")String menu);
	@Select("select sum(count) from enterprise_report_view where eno=${eno} and mname=#{menu} and Year(otime) = ${year} and Month(otime) >= ${month1} and Month(otime) <= ${month2} group by mname")
	public Object getMenuSalesByQuater(@Param("eno")int eno, @Param("month1")int month1, @Param("month2")int month2,@Param("year")int year, @Param("menu")String menu);
	@Select("select sum(count) from enterprise_report_view where eno=${eno} and mname=#{menu} and Year(otime) = ${year} and Month(otime) =${month} group by mname")
	public Object getMenuSalesByMonth(@Param("eno")int eno, @Param("month")int month1,@Param("year")int year, @Param("menu")String menu);
	@Select("select sum(count) from enterprise_report_view where eno=${eno} and mname=#{menu} and (date_format(otime, '%H') = ${time}) and (Year(otime) between ${start} and ${end}) group by mname")
	public Object getMenuSalesByTimeY(@Param("eno")int eno, @Param("time")int time,@Param("start")String start,@Param("end")String end, @Param("menu")String menu);
	@Select("select sum(count) from enterprise_report_view where eno=${eno} and mname=#{menu} and (date_format(otime, '%H') = ${time}) and otime >= #{start} and otime <= #{end} group by mname")
	public Object getMenuSalesByTimeC(@Param("eno")int eno, @Param("time")int time,@Param("start")String start,@Param("end")String end, @Param("menu")String menu);
	
	@Select("select eno, ename, otime, ptime, count, mname, price, mcategory, total, odcode from enterprise_report_view where eno=${eno} and (Year(otime) between ${start} and ${end}) order by otime asc")
	public List<ReportView> getSalesReport(@Param("eno")int eno, @Param("start")String start, @Param("end")String end);
	@Select("select eno, ename, otime, ptime, count, mname, price, mcategory, total, odcode from enterprise_report_view where eno=${eno} and mname=#{menu} and (Year(otime) between ${start} and ${end}) order by otime asc")
	public List<ReportView> getMenuSalesReport(@Param("eno")int eno, @Param("start")String start, @Param("end")String end, @Param("menu")String menu);
}
