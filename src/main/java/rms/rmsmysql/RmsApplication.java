package rms.rmsmysql;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@ComponentScan
@SpringBootApplication
public class RmsApplication {




	public static void main(String[] args) {
		SpringApplication.run(RmsApplication.class, args);
	}

}
