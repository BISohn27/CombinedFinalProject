package com.example.finProject.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.data.repository.query.Param;

import com.example.finProject.dto.Order;
import com.example.finProject.dto.OrderDetail;
import com.example.finProject.dto.OrderDetailView;

@Mapper
public interface OrderMapper {

	@Insert("Insert into `order`(eno, total, `otime`) values(#{ENO}, #{TOTAL}, current_timestamp)")
	public void POSTorder(@Param("ENO") int ENO, @Param("TOTAL") int TOTAL);
	
	@Select("Select ocode from `order` where eno=#{ENO} order by ocode desc limit 1")
	public int POSTorderResponse(@Param("ENO") int ENO);
	
	@Select("Select * from `order` where ocode=#{OCODE}")
	public Order GETorder(@Param("OCODE") int OCODE);
	
	@Update("Update `order` set eno=#{ENO}, `payment`=#{PAYMENT},"
			+ " `total`=#{TOTAL} where ocode=#{OCODE}")
	public void PUTorder(@Param("OCODE") int OCODE, @Param("ENO") int ENO, 
			@Param("PAYMENT") char PAYMENT, @Param("TOTAL") int TOTAL);
	
	@Delete("Delete from `order` where ocode=#{OCODE}")
	public void DELETEorder(@Param("OCODE") int OCODE);

	@Select("Select * from orderdetail where eno=#{ENO} and ocode=#{OCODE}")
	public OrderDetail[] GETorderdetails(@Param("ENO")int ENO, @Param("OCODE")int OCODE);
	
	@Update("Update `order` set payment='Y', ptime=current_timestamp where ocode=#{OCODE}")
	public int payment(@Param("OCODE")int OCODE);
}
