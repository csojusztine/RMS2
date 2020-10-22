package rms.rmsmysql;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

@SpringBootApplication
public class RmsApplication {

	private Connection connect = null;
	private Statement state = null;
	private ResultSet result = null;


	public static void main(String[] args) {
		SpringApplication.run(RmsApplication.class, args);
	}

}
