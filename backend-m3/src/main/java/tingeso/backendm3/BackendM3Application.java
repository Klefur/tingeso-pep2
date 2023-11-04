package tingeso.backendm3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BackendM3Application {

	public static void main(String[] args) {
		SpringApplication.run(BackendM3Application.class, args);
	}

}
