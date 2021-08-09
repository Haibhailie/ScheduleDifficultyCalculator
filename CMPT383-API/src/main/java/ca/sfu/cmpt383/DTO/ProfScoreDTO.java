package ca.sfu.cmpt383.DTO;

public class ProfScoreDTO {

    private String instructorName;
    private String courseName;

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

    private String courseDiggerGrade;
    private double courseDiggerFailRate;
    private double RMPScore;

    private float algorithmScore;
    private float overallDifficulty;

    public ProfScoreDTO(String instructorName, String courseName, String courseDiggerGrade, double courseDiggerFailRate, double RMPScore) {
        this.instructorName = instructorName;
        this.courseName = courseName;
        this.courseDiggerGrade = courseDiggerGrade;
        this.courseDiggerFailRate = courseDiggerFailRate;
        this.RMPScore = RMPScore;
    }



}
