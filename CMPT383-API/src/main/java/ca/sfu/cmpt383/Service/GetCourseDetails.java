package ca.sfu.cmpt383.Service;

import ca.sfu.cmpt383.DTO.CourseDTO;
import ca.sfu.cmpt383.DTO.ProfScoreDTO;
import ca.sfu.cmpt383.Service.CalculateCourseDifficulty;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class GetCourseDetails {

    public ProfScoreDTO createProfScoreDTO(CourseDTO presentCourse) {
        String s, returnedJson = "";
        try {
            // Process p = Runtime.getRuntime().exec("python
            // ../CoursysAPI/GetCourseDetails.py"+" 2021 fall cmpt 300 D100"); //Works in
            // IntelliJ
            String processCommand = "python ../CoursysAPI/GetCourseDetails.py " + presentCourse.getYear() + " "
                    + presentCourse.getTerm() + " " + presentCourse.getDepartment() + " "
                    + presentCourse.getCourseNumber() + " " + presentCourse.getSection();
            System.out.println(processCommand);
            Process p = Runtime.getRuntime()
                    .exec(processCommand);
            BufferedReader brInput = new BufferedReader(new InputStreamReader(p.getInputStream()));
            System.out.println("Request made: ");
            while ((s = brInput.readLine()) != null) {
                    System.out.println(s);
                    returnedJson = s;
            }

            System.out.println("The JSON procured from the Python application is: \n" + returnedJson);
            JSONObject jsonObj = new JSONObject(returnedJson.toString());
            ProfScoreDTO presentProfScore = new ProfScoreDTO(jsonObj.getString("instructor"),
                    jsonObj.getString("course"), jsonObj.getString("courseDiggerMeanGrade"),
                    jsonObj.getDouble("courseDiggerFailRate"), jsonObj.getDouble("RMPscore"));
            CalculateCourseDifficulty calculator = new CalculateCourseDifficulty();
            ProfScoreDTO computerProfScoreDTO = calculator.calculateScore(presentProfScore);
            return computerProfScoreDTO;

        } catch (IOException | JSONException e) {
            ProfScoreDTO presentProfScore = new ProfScoreDTO();
            System.out.println(e);
            return  presentProfScore;
        }
    }
}
