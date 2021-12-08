package com.fm.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
	private final TokenProvider tokenProvider;
	private final JwtAuthenticationEntryPoint jaep;
	private final JwtAccessDeniedHandler jadh;
	
	@Autowired
	public SecurityConfiguration(TokenProvider tokenProvider,
									JwtAuthenticationEntryPoint jaep,
									JwtAccessDeniedHandler jadh) {
		this.tokenProvider = tokenProvider;
		this.jaep = jaep;
		this.jadh = jadh;
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
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
            .antMatchers("/api/v1/test/permit-all").permitAll()
            .antMatchers("/api/v1/test/auth").authenticated()
            .antMatchers("/**").authenticated()
            .anyRequest().permitAll()
             
            .and()
            .formLogin().disable()
            .apply(new JwtSecurityConfiguration(tokenProvider));
    }

}