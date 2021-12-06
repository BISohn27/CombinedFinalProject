package com.example.finProject.mapper;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.data.repository.query.Param;

import com.example.finProject.dto.Image;

@Mapper
public interface ImageMapper {

	@Insert("Insert into `image`(eno, `path`) values(#{ENO}, #{PATH})")
	public void POSTimage(@Param("ENO") int ENO, @Param("PATH") String PATH);
	
	@Select("Select ino from `image` where eno=#{ENO} order by ino desc limit 1")
	public int POSTimageResponse(@Param("ENO") int ENO);
	
	@Select("Select * from `image` where ino=#{INO}")
	public Image GETimage(@Param("INO") int INO);
	
	@Update("Update image set eno=#{ENO}, `path`=#{PATH} where ino=#{INO}")
	public void PUTimage(@Param("INO") int INO, @Param("ENO") int ENO, @Param("PATH") String PATH);
	
	@Delete("Delete from image where ino=#{INO}")
	public void DELETEimage(@Param("INO") int INO);
}
