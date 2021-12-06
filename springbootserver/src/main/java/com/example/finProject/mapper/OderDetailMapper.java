package com.example.finProject.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.data.repository.query.Param;

import com.example.finProject.dto.OrderDetail;
import com.example.finProject.dto.OrderDetailView;

@Mapper
public interface OderDetailMapper {

	@Insert("Insert into orderdetail(mcode, eno, ocode, count)"
			+ " values(#{MCODE}, #{ENO}, #{OCODE}, #{COUNT})")
	public void POSTorderdetail(@Param("MCODE")int MCODE, @Param("ENO")int ENO,
			@Param("OCODE")int OCODE, @Param("COUNT")int COUNT);
	
//	@Select("Select odcode from orderdetail where eno=#{ENO} order by odcode desc limit 1")
//	public int POSTorderdetailResponse(@Param("ENO")int ENO);
	
	@Select("Select ocode, odcode, o.mcode, mname, count from orderdetail o inner join menu m on o.mcode = m.mcode where OCODE=#{OCODE} order by odcode desc")
	public OrderDetailView[] POSTorderdetailResponse(@Param("OCODE")int OCODE);
	
	@Select("select * from orderdetail where odcode=#{ODCODE}")
	public OrderDetail GETorderdetail(@Param("ODCODE")int ODCODE);
	
	@Update("Update orderdetail set mcode=#{MCODE}, eno=#{ENO}, ocode=#{OCODE}, count=#{COUNT}"
			+ " where odcode=#{ODCODE}")
	public void PUTorderdetail(@Param("ODCODE")int ODCODE, @Param("MCODE")int MCODE,
			@Param("ENO")int ENO, @Param("OCODE")int OCODE, @Param("COUNT")int COUNT);
	
	@Delete("Delete from orderdetail where odcode=#{ODCODE}")
	public void DELETEorderdetail(@Param("ODCODE")int ODCODE);
}
