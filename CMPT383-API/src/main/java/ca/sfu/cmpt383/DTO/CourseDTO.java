package ca.sfu.cmpt383.DTO;

public class CourseDTO {

    private String year;
    private String term;
    private String department;
    private String courseNumber;
    private String section;

    public CourseDTO(String year, String term, String department, String courseNumber, String section) {
        this.year = year;
        this.term = term;
        this.department = department;
        this.courseNumber = courseNumber;
        this.section = section;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getTerm() {
        return term;
    }

    public void setTerm(String term) {
        this.term = term;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getCourseNumber() {
        return courseNumber;
    }

    public void setCourseNumber(String courseNumber) {
        this.courseNumber = courseNumber;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }
}
