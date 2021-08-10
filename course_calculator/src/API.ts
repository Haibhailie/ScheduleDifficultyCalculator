export enum Term {
  SPRING = "Spring",
  SUMMER = "Summer",
  FALL = "Fall",
}

export interface Department {
  text: string;
  value: string;
  name: string;
}

export interface Course {
  text: string;
  value: string;
  title: string;
}

export interface Section {
  text: string;
  value: string;
  title: string;
  classType: string;
  sectionCode: string;
  associatedClass: string;
}

export interface DifficultyScore {
  instructorName: string;
  courseName: string;
  courseDiggerGrade: string;
  courseDiggerFailRate: number;
  courseDifficulty: number;
  algorithmScore: number;
  overallDifficulty: number;
  rmpscore: number;
  rmpdifficulty: number;
  cddifficulty: number;
}

const baseURL = "http://www.sfu.ca/bin/wcm/course-outlines?";
const baseDifficultyURL = "http://localhost:8080/courseAPI/getCourse/";

export const fetchDepartments = async (year: number, term: String) => {
  const getDepartmentsURL = baseURL + year + "/" + term;
  let deptArray: Department[];
  const deptData = await (await fetch(getDepartmentsURL))
    .json()
    .then((res) => (deptArray = <Department[]>res));

  return deptData;
};

export const fetchCourses = async (year: number, term: String, dep: String) => {
  const getCoursesURL = baseURL + year + "/" + term + "/" + dep;
  let courseArray: Course[];
  const coureseData = await (await fetch(getCoursesURL))
    .json()
    .then((res) => (courseArray = <Course[]>res));
  return coureseData;
};

export const fetchSections = async (
  year: number,
  term: String,
  dep: String,
  course: String
) => {
  const getSectionURL = baseURL + year + "/" + term + "/" + dep + "/" + course;
  let sectionArray: Section[];
  const sectionData = await (await fetch(getSectionURL))
    .json()
    .then((res) => (sectionArray = <Section[]>res));
  return sectionData;
};

export const fetchCourseDifficultyData = async (
  year: number,
  term: String,
  dep: String,
  course: String,
  section: String
) => {
  const getDifficultyURL =
    baseDifficultyURL +
    year +
    "?" +
    "term=" +
    term +
    "&dep=" +
    dep +
    "&courseNum=" +
    course +
    "&section=" +
    section;
  let difficultyResponse: DifficultyScore;
  const difficultyData = await (await fetch(getDifficultyURL))
    .json()
    .then((res) => (difficultyResponse = <DifficultyScore>res));
  return difficultyData;
};
