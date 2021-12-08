package com.fm.configuration.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fm.dto.Enterprise;
import com.fm.mapper.EnterpriseMapper;

@Service
public class SecurityUserDetailsService implements UserDetailsService{
	@Autowired
	EnterpriseMapper mapper;
	
    @Override
    public UserDetails loadUserByUsername(String eno) throws UsernameNotFoundException{
        Enterprise enterprise = mapper.GETenterprise(Integer.parseInt(eno));
        
        if(enterprise == null) {
        	throw new UsernameNotFoundException(eno + "을 데이터베이스에서 찾을 수 없습니다.");
        } else {
        	return new SecurityUser(String.valueOf(enterprise.getEno()),enterprise.getPassword());
        }
    }
}
