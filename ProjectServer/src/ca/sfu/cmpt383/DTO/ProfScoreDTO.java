package ProjectServer.src.ca.sfu.cmpt383.DTO;

public class ProfScoreDTO {

    private String instructorName;
    private String courseName;
    private float RMPScore;
    private float algorithmScore;
    private float overallDifficulty;

    public ProfScoreDTO(String instructorName, String courseName, float RMPScore, float algorithmScore, float overallDifficulty) {
        this.instructorName = instructorName;
        this.courseName = courseName;
        this.RMPScore = RMPScore;
        this.algorithmScore = algorithmScore;
        this.overallDifficulty = overallDifficulty;
    }



}
