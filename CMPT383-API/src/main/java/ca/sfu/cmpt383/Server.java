package ca.sfu.cmpt383;

import ca.sfu.cmpt383.DTO.CourseDTO;
import javax.servlet.http.HttpServletResponse;

import ca.sfu.cmpt383.DTO.ProfScoreDTO;
import ca.sfu.cmpt383.Service.GetCourseDetails;
import org.springframework.web.bind.annotation.*;

@RestController
public class Server {

    GetCourseDetails courseDetails = new GetCourseDetails();

    // http://localhost:8080/courseAPI/getCourse/2021?term=spring&dep=cogs&courseNum=110&section=D100
    // http://localhost:8080/courseAPI/getCourse/2020?term=summer&dep=cogs&courseNum=110&section=D100
    @CrossOrigin
    @GetMapping("/courseAPI/getCourse/{year}")
    public ProfScoreDTO getCourseData(@PathVariable String year,
            @RequestParam(value = "term", defaultValue = "summer") String term,
            @RequestParam(value = "dep", defaultValue = "cmpt") String dep,
            @RequestParam(value = "courseNum", defaultValue = "383") String courseNum,
            @RequestParam(value = "section", defaultValue = "D100") String section, HttpServletResponse response) {
        CourseDTO newCourseData = new CourseDTO(year, term, dep, courseNum, section);
        ProfScoreDTO presentProfScore = courseDetails.createProfScoreDTO(newCourseData);
        response.setStatus(200, "Course has been registered");
        return presentProfScore;
    }
}
