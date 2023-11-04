package tingeso.backendconfig;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class BackendConfigApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendConfigApplication.class, args);
	}

}
