package com.example.finProject.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.data.repository.query.Param;

import com.example.finProject.dto.Menu;

@Mapper
public interface MenuMapper {
	@Insert("Insert into menu(`ENO`,`MNAME`,`PRICE`,`MCOMMENT`,`MIMAGE`,`MCATEGORY`)"
			+ " values(#{ENO},#{MNAME},#{PRICE},#{MCOMMENT},#{MIMAGE},#{MCATEGORY})")
	public void POSTmenu(@Param("ENO") int ENO, @Param("MNAME") String MNAME,
			@Param("PRICE") int PRICE, @Param("MCOMMENT") String MCOMMENT,
			@Param("MIMAGE") String MIMAGE, @Param("MCATEGORY") String MCATEGORY);
	
	@Select("select mcode from menu where ENO=#{ENO} and MNAME=#{MNAME} order by mcode desc limit 1")
	public int POSTmenuResponse(@Param("ENO") int ENO, @Param("MNAME") String MNAME);
	
	@Select("select * from menu where MCODE=#{MCODE} order by MCODE desc limit 1")
	public Menu GETmenu(@Param("MCODE") int MCODE);
	
	@Update("Update menu set `ENO`=#{ENO},`MNAME`=#{MNAME},`PRICE`=#{PRICE},"
			+ "`MCOMMENT`=#{MCOMMENT},`MIMAGE`=#{MIMAGE},`MCATEGORY`=#{MCATEGORY}"
			+ " where MCODE=#{MCODE}")
	public void PUTmenu(@Param("ENO") int ENO,@Param("MNAME") String MNAME, @Param("PRICE") int PRICE,
			@Param("MCOMMENT") String MCOMMENT, @Param("MIMAGE") String MIMAGE,
			@Param("MCATEGORY") String MCATEGORY, @Param("MCODE") int MCODE);
	
	@Delete("Delete from menu where MCODE=#{MCODE}")
	public void DELETmenu(@Param("MCODE") int MCODE);
}
