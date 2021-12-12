package com.fm.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fm.jwt.JwtAccessDeniedHandler;
import com.fm.jwt.JwtAuthenticationEntryPoint;
import com.fm.jwt.JwtSecurityConfiguration;
import com.fm.jwt.TokenProvider;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	private final TokenProvider tokenProvider;
	private final JwtAuthenticationEntryPoint jaep;
	private final JwtAccessDeniedHandler jadh;
	private final RedisTemplate<String,Object> redisTemplate;
	
	@Autowired
	public SecurityConfiguration(TokenProvider tokenProvider,
									JwtAuthenticationEntryPoint jaep,
									JwtAccessDeniedHandler jadh,
									RedisTemplate<String,Object> redisTemplate) {
		this.tokenProvider = tokenProvider;
		this.jaep = jaep;
		this.jadh = jadh;
		this.redisTemplate = redisTemplate;
	}
	
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
        	.apply(new JwtSecurityConfiguration(tokenProvider,redisTemplate))
        	
        	.and()
        	.exceptionHandling()
        	.accessDeniedHandler(jadh)
        	.authenticationEntryPoint(jaep)
        	.and()
            
        	.cors().and()
            .csrf().disable()
            
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            
            .and()
            .authorizeRequests()
            .antMatchers("/authorize/{eno}").authenticated()
            .antMatchers("/authenticate").permitAll()
            .anyRequest().permitAll()
             
            .and()
            .formLogin().disable();
    }

}