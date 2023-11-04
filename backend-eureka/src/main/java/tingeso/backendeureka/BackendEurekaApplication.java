package tingeso.backendeureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class BackendEurekaApplication {
	public static void main(String[] args) {
		SpringApplication.run(BackendEurekaApplication.class, args);
	}

}
