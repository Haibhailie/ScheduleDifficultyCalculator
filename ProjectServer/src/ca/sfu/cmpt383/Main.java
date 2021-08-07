package ca.sfu.cmpt383;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;

public class Main {
    public static void main(String[] args) throws URISyntaxException {
        System.out.println("Hello world!!!!!");
        getCourseDetails();
    }

    public static void getCourseDetails() throws URISyntaxException {
        String s;
//        String path = new File("").getAbsolutePath()+"/getCourseDetails.py";
//        System.out.println(path);

        try {
            Process p = Runtime.getRuntime().exec("python CoursysAPI/getCourseDetails.py"+" 2021 fall cmpt 300 D100"); //Works in IntelliJ

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

