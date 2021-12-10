package com.fm.jwt;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtSecurityConfiguration extends SecurityConfigurerAdapter<DefaultSecurityFilterChain,HttpSecurity>{
	private TokenProvider tokenProvider;
	private RedisTemplate<String,Object> redisTemplate;
	
	public JwtSecurityConfiguration(TokenProvider tokenProvider,RedisTemplate<String,Object> redisTemplate) {
		this.tokenProvider = tokenProvider;
		this.redisTemplate = redisTemplate;
	}
	
	@Override
	public void configure(HttpSecurity http) {
		JwtFilter customFilter = new JwtFilter(tokenProvider,redisTemplate);
		http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
	}
}
