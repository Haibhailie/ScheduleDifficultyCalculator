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

const baseURL = "http://www.sfu.ca/bin/wcm/course-outlines?";

export const fetchDepartments = async (year: number, term: String) => {
  const getDepartmentsURL = baseURL + year + "/" + term;
  let deptArray: Department[];
  const courseData = await (await fetch(getDepartmentsURL))
    .json()
    .then((res) => (deptArray = <Department[]>res));

  return courseData;
};
