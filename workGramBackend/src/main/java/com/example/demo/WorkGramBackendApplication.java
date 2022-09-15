package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableJpaRepositories(basePackages={"com.workgram.repository"})
@EntityScan(basePackages={"com.workgram.jpa"})
@ComponentScan(basePackages={"com.workgram.controller","com.workgram.jpa","com.workgram.repository", "com.workgram.utils"})
@EnableWebMvc
@SpringBootApplication
public class WorkGramBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorkGramBackendApplication.class, args);
	}

}
