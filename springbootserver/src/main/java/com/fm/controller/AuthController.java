package com.fm.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.fm.dto.Login;
import com.fm.helper.JsonParcer;
import com.fm.jwt.JwtFilter;
import com.fm.jwt.TokenProvider;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class AuthController {
	private final TokenProvider tokenProvider;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final PasswordEncoder passwordEncoder;
	private final JsonParcer jsonParcer;
	private final RedisTemplate<String,Object> redisTemplate;
	
	@Autowired
	public AuthController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, PasswordEncoder passwordEncoder, JsonParcer jsonParcer,RedisTemplate<String,Object> redisTemplate) {
		this.tokenProvider = tokenProvider;
		this.authenticationManagerBuilder = authenticationManagerBuilder;
		this.passwordEncoder = passwordEncoder;
		this.jsonParcer = jsonParcer;
		this.redisTemplate = redisTemplate;
	}
	
	@PostMapping("/authenticate")
	public ResponseEntity<Map<String,String>> authenticate(@RequestBody Login login){
		Map<String,String> map = new HashMap<>();
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(login.getEno(),login.getPassword());
		
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.createToken(authentication);
		
		map.put("eno",authentication.getName());
		map.put("token", jwt);
		
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
		
		return new ResponseEntity<>(map, httpHeaders, HttpStatus.BAD_REQUEST.OK);
	}
	
	@GetMapping(path="/authorize/{eno}")
	public ResponseEntity<Boolean> authorize(@PathVariable("eno")String enoFromPath, @RequestHeader(JwtFilter.AUTHORIZATION_HEADER) String token){
		token = token.substring(7);
		String eno =tokenProvider.getSubject(token);
		
		if(eno.equals(enoFromPath)) {
			return new ResponseEntity<>(true,HttpStatus.BAD_REQUEST.OK);
		} else {
			return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST.OK);
		}
	}
	
	@GetMapping("/authorize")
	public ResponseEntity<String> authorize(@RequestHeader(JwtFilter.AUTHORIZATION_HEADER) String token){
		token = token.substring(7);
		String eno =tokenProvider.getSubject(token);
		
		return new ResponseEntity<>(eno,HttpStatus.BAD_REQUEST.OK);
	}
	
	@PostMapping("/logouts")
	public ResponseEntity<?> logout(@RequestBody String param){
		Map<String,String> map = null;
		try {
			map = jsonParcer.getJsonData(new String[] {"eno","token"}, param);
			String token = map.get("token");
			String enoFromParam = map.get("eno");
			String eno =tokenProvider.getSubject(token);
			Long expiration = tokenProvider.getExpiration(token);
			
			if(eno.equals(enoFromParam)) {
				redisTemplate.opsForValue().set(token,"logout",expiration,TimeUnit.MILLISECONDS);
				return new ResponseEntity<Boolean>(true,HttpStatus.OK);
			}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<Boolean>(false,HttpStatus.OK);
	}
}
