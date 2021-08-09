package ca.sfu.cmpt383;

import ca.sfu.cmpt383.Service.GetCourseDetails;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.net.URISyntaxException;

@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
//		try {
//			GetCourseDetails.getCourseDetails();
//		} catch (URISyntaxException e) {
//			e.printStackTrace();
//		}
	}

}
