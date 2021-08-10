package ca.sfu.cmpt383.Service;

import ca.sfu.cmpt383.DTO.ProfScoreDTO;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CalculateCourseDifficulty {

    public ProfScoreDTO calculateScore(ProfScoreDTO profScoreDTO) {
        Matcher matcher = Pattern.compile("\\d+").matcher(profScoreDTO.getCourseName());
        matcher.find();
        int courseLevel = Integer.parseInt(matcher.group());
        double courseScore = computeCourseScore(courseLevel);
        profScoreDTO.setCourseDifficulty(courseScore);
        double CDScore = computeCDScore(profScoreDTO.getCourseDiggerFailRate(), profScoreDTO.getCourseDiggerGrade());
        profScoreDTO.setCDDifficulty(CDScore);
        double RMPScore = computeRMPScore(profScoreDTO.getRMPScore());
        profScoreDTO.setRMPDifficulty(RMPScore);
        float algorithmScore = (float) (courseScore + CDScore + RMPScore);
        profScoreDTO.setAlgorithmScore(algorithmScore);
        float overallDifficulty = algorithmScore/5;
        profScoreDTO.setOverallDifficulty(overallDifficulty);
        return profScoreDTO;
    }

    public double computeCourseScore(int courseLevel) {
        // Making the max score for a 400 level course as 10 so it works in our algorithm
        double courseScore = 0;
        if (courseLevel >= 100 && courseLevel < 200)
            courseScore = 1;
        else if (courseLevel >= 200 && courseLevel < 300)
            courseScore = 2;
        else if (courseLevel >= 300 && courseLevel < 400)
            courseScore = 3;
        else if (courseLevel >= 400 && courseLevel < 500)
            courseScore = 4;
        courseScore = courseScore * 1.25 * 2;
        return courseScore;
    }

    public double computeCDScore(double failRate, String grade){
        double failScore = 0;

        if(failRate < 2.5)
            failScore = 2.5;
        else if(failRate>=2.5 && failRate<4)
            failScore = 5.0;
        else if (failRate>=4 && failRate<6)
            failScore = 7.5;
        else
            failScore = 10;

        double gradeScore = 0;
        if(grade == "A+")
            gradeScore = 0;
        else if(grade == "A")
            gradeScore = 1;
        else if (grade == "A-")
            gradeScore = 2;
        else if (grade == "B+")
            gradeScore = 3;
        else if (grade == "B")
            gradeScore = 4;
        else if (grade == "B-")
            gradeScore = 5;
        else if (grade == "C+")
            gradeScore = 6;
        else if (grade == "C")
            gradeScore = 7;
        else if (grade == "C-")
            gradeScore = 8;
        else
            gradeScore = 10;

        double overallScore = (failScore+gradeScore)/2;
        return overallScore;
    }

    public double computeRMPScore(double rmpScore){
        if(rmpScore == -1)
            return 0;
        else
            return rmpScore*2;
    }
}
