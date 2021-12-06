package com.example.finProject.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.repository.query.Param;

import com.example.finProject.dto.Enterprise;

@Mapper
public interface BaseMapper {
	@Select("select * from enterprise")
	public Enterprise[] GETenterprises();
	
	@Select("select * from enterprise where eno=#{ENO} and password=#{PASSWORD}")
	public Enterprise Login(@Param("ENO")int ENO, @Param("PASSWORD")String PASSWORD);
}
