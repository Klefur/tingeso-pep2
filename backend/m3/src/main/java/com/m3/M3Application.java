package com.m3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class M3Application {

	public static void main(String[] args) {
		SpringApplication.run(M3Application.class, args);
	}

}
