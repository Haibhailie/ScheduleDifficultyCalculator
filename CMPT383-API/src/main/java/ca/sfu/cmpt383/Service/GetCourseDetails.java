package ca.sfu.cmpt383.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.nio.file.Paths;

public class GetCourseDetails {
    public static void getCourseDetails() throws URISyntaxException {
        String s;
        System.out.println(Paths.get(".").toAbsolutePath().normalize().toString());
        try {

            Process p = Runtime.getRuntime().exec("python ../CoursysAPI/GetCourseDetails.py"+" 2021 fall cmpt 300 D100"); //Works in IntelliJ

            BufferedReader brInput = new BufferedReader(new
                    InputStreamReader(p.getInputStream()));
            BufferedReader brError = new BufferedReader(new
                    InputStreamReader(p.getErrorStream()));

            System.out.println("A successful read is: ");
            while ((s = brInput.readLine()) != null) {
                System.out.println(s);
            }

            System.out.println("An unsuccessful read is: ");
            while ((s = brError.readLine()) != null) {
                System.out.println(s);
            }
            System.exit(0);

        } catch (IOException e){
            System.out.println(e);
        }
    }
}
