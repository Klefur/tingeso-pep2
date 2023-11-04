package com.backend-m2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class M2Application {

	public static void main(String[] args) {
		SpringApplication.run(M2Application.class, args);
	}

}
