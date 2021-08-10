package ca.sfu.cmpt383.DTO;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ProfScoreDTO {

    private String instructorName;
    private String courseName;
    private String courseDiggerGrade;
    private double courseDiggerFailRate;
    private double RMPScore;

    private double RMPDifficulty;
    private double CDDifficulty;
    private double courseDifficulty;

    private float algorithmScore;
    private float overallDifficulty;

    public ProfScoreDTO(String instructorName, String courseName, String courseDiggerGrade, double courseDiggerFailRate,
            double RMPScore) {
        this.instructorName = instructorName;
        this.courseName = courseName;
        this.courseDiggerGrade = courseDiggerGrade;
        this.courseDiggerFailRate = courseDiggerFailRate;
        this.RMPScore = RMPScore;
    }

    public ProfScoreDTO() {
        this.instructorName = "";
        this.courseName = "";
        this.courseDiggerGrade = "";
        this.courseDiggerFailRate = 0;
        this.RMPScore = 0;
        this.RMPDifficulty = 0;
        this.CDDifficulty = 0;
        this.courseDifficulty = 0;
        this.algorithmScore = 0;
        this . overallDifficulty = 0;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public String getCourseName() {
        return courseName;
    }

    public String getCourseDiggerGrade() {
        return courseDiggerGrade;
    }

    public double getCourseDiggerFailRate() {
        return courseDiggerFailRate;
    }

    public double getRMPScore() {
        return RMPScore;
    }

    public float getAlgorithmScore() {
        return algorithmScore;
    }

    public void setAlgorithmScore(float algorithmScore) {
        this.algorithmScore = algorithmScore;
    }

    public float getOverallDifficulty() {
        return overallDifficulty;
    }

    public void setOverallDifficulty(float overallDifficulty) {
        this.overallDifficulty = overallDifficulty;
    }

    public double getRMPDifficulty() {
        return RMPDifficulty;
    }

    public void setRMPDifficulty(double RMPDifficulty) {
        this.RMPDifficulty = RMPDifficulty;
    }

    public double getCDDifficulty() {
        return CDDifficulty;
    }

    public void setCDDifficulty(double CDDifficulty) {
        this.CDDifficulty = CDDifficulty;
    }

    public double getCourseDifficulty() {
        return courseDifficulty;
    }

    public void setCourseDifficulty(double courseDifficulty) {
        this.courseDifficulty = courseDifficulty;
    }

}
