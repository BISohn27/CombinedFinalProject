package com.fm.jwt;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

//jwt 생성 및 관리 클래스
@Component
public class TokenProvider implements InitializingBean{
	private final Logger logger = LoggerFactory.getLogger(TokenProvider.class);
	
	private static String AUTHORITIES_KEY = "auth";
	
	private final String secret = "c2lsdmVybmluZS10ZWNoLXNwcmluZy1ib290LWp3dC10dXRvcmlhbC1zZWNyZXQtc2lsdmVybmluZS10ZWNoLXNwcmluZy1ib290LWp3dC10dXRvcmlhbC1zZWNyZXQK";
	private final long tokenValidityInMilliseconds = 86400 * 1000;
	
	private Key key;
	
	@Override
	public void afterPropertiesSet() {
		byte[] keyBytes = Decoders.BASE64.decode(secret);
		this.key= Keys.hmacShaKeyFor(keyBytes);
	}
	
	public String createToken(Authentication authentication) {
		String authorities = authentication.getAuthorities().stream()
								.map(GrantedAuthority::getAuthority)
								.collect(Collectors.joining(","));
		
		long now = (new Date()).getTime();
		Date validity = new Date(now + this.tokenValidityInMilliseconds);
		
		return Jwts.builder()
					.setSubject(authentication.getName())
					.claim(AUTHORITIES_KEY, authorities)
					.signWith(key,SignatureAlgorithm.HS512)
					.setExpiration(validity)
					.compact();
	}
	
	public Authentication getAuthentication(String token) {
		Claims claims = Jwts
				.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(token)
				.getBody();
		
		Collection<? extends GrantedAuthority> authorities =
				Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
						.map(SimpleGrantedAuthority::new)
						.collect(Collectors.toList());
		
		User principal = new User(claims.getSubject(),"",authorities);
		
		return new UsernamePasswordAuthenticationToken(principal,token,authorities);
	}
	
	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
			logger.info("잘못된 JWT 서명입니다.");
		} catch (ExpiredJwtException e) {
			logger.info("만료된 JWT입니다.");
		} catch(UnsupportedJwtException e) {
			logger.info("지원하지 않는 JWT입니다.");
		} catch(IllegalArgumentException e) {
			logger.info("JWT이 잘못되었습니다.");
		}
		return false;
	}
}
