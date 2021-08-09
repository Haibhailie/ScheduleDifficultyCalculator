package ca.sfu.cmpt383;
import javax.annotation.PostConstruct;
import ca.sfu.cmpt383.DTO.CourseDTO;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Server {

    //http://localhost:8080/courseAPI/getCourse/2021?term=spring&dep=cogs&courseNum=110&section=D100
    @GetMapping("/courseAPI/getCourse/{year}")
    public CourseDTO getCourseData(@PathVariable String year,
                                   @RequestParam(value="term", defaultValue = "summer") String term,
                                   @RequestParam(value="dep", defaultValue = "cmpt") String dep,
                                   @RequestParam(value="courseNum", defaultValue = "300") String courseNum,
                                   @RequestParam(value="section", defaultValue = "D100") String section,
                                   HttpServletResponse response){
        CourseDTO newCourseData = new CourseDTO(year, term, dep, courseNum, section);
        response.setStatus(200, "Course has been registered");
        System.out.println(year+term+dep+courseNum+section);
        return newCourseData;
    }
}
