import React from "react";
import { useState } from "react";
import {
  Term,
  fetchDepartments,
  Department,
  Course,
  fetchCourses,
  fetchSections,
  Section,
} from "./API";
import { Button } from "react-bootstrap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useEffect } from "react";
import CourseCard from "./components/CourseCard";
import titleImage from "./images/title.jpg";
import { GlobalStyle } from "./App.styles";

const App = () => {
  //Year Variables and functions
  const yearList: string[] = ["2019", "2020", "2021"];
  const [selectedYear, setSelectedYear] = useState<string>();
  useEffect(() => {
    setTermDropDownDisabled(false);
  }, [selectedYear]);

  //Term Variables and functions
  const termList = [Term.SPRING, Term.SUMMER, Term.FALL];
  const [termDropdownDisabled, setTermDropDownDisabled] =
    useState<boolean>(true);
  const [selectedTerm, setSelectedTerm] = useState<string>();

  useEffect(() => {}, [selectedTerm]);

  // //Department Variables and functions
  // useEffect(() => {
  //   let year: number = 0;
  //   if (selectedYear) {
  //     year = +selectedYear;
  //   } else {
  //     year = 2021;
  //   }
  //   const GetDepDropdownDetails = async (year: number, term: String) => {
  //     const departmentFetch = await fetchDepartments(year, term);
  //     let labels: string[] = [];
  //     for (let department of departmentFetch) {
  //       labels.push(department.text);
  //     }
  //     return labels;
  //   };
  //   GetDepDropdownDetails(year, selectedTerm ? selectedTerm : Term.SUMMER).then(
  //     (res) => setDepartmentLabels(res)
  //   );
  //   console.log(departmentLabels);
  // }, [selectedTerm]);

  // const [departmentDropdownDisabled, setDepartmentDropdownDisabled] =
  //   useState<boolean>(true);
  // const [departmentLabels, setDepartmentLabels] = useState<string[]>([]);
  // const [selectedDepartment, setSelectedDepartment] = useState<string>();

  // useEffect(() => {
  //   let year: number = 0;
  //   if (selectedYear) {
  //     year = +selectedYear;
  //   } else {
  //     year = 2021;
  //   }
  //   const GetCourseDropdownDetails = async (
  //     year: number,
  //     term: String,
  //     dep: String
  //   ) => {
  //     let courseFetch = await fetchCourses(year, term, dep);
  //     let labels: string[] = [];
  //     for (let course of courseFetch) {
  //       labels.push(course.text);
  //     }
  //     return labels;
  //   };
  //   GetCourseDropdownDetails(
  //     year,
  //     selectedTerm ? selectedTerm : Term.SUMMER,
  //     selectedDepartment ? selectedDepartment : "cmpt"
  //   )
  //     .then((res) => setCourseLabels(res))
  //     .then(() => setCourseDropdownDisabled(false));
  // }, [selectedDepartment]);

  // //Course Variables and functions
  // const [courseDropdownDisabled, setCourseDropdownDisabled] =
  //   useState<boolean>(true);
  // const [courseLabels, setCourseLabels] = useState<string[]>([]);
  // const [selectedCourse, setCourse] = useState<string>();

  // useEffect(() => {
  //   let year: number = 0;
  //   if (selectedYear) {
  //     year = +selectedYear;
  //   } else {
  //     year = 2021;
  //   }
  //   const GetSectionDropdownDetails = async (
  //     year: number,
  //     term: String,
  //     dep: String,
  //     course: String
  //   ) => {
  //     const sectionFetch = await fetchSections(year, term, dep, course);
  //     let labels: string[] = [];
  //     for (let section of sectionFetch) {
  //       labels.push(section.text);
  //     }
  //     return labels;
  //   };
  //   GetSectionDropdownDetails(
  //     year,
  //     selectedTerm ? selectedTerm : Term.SUMMER,
  //     selectedDepartment ? selectedDepartment : "cmpt",
  //     selectedCourse ? selectedCourse : "383"
  //   )
  //     .then((res) => setSectionLabels(res))
  //     .then(() => setSectionDropdownDisabled(false));
  // }, [selectedCourse]);

  // //Section Variables and functions
  // const [sectionDropdownDisabled, setSectionDropdownDisabled] =
  //   useState<boolean>(true);
  // const [sectionLabels, setSectionLabels] = useState<string[]>([]);
  // const [section, setSection] = useState<string>();

  // useEffect(() => {
  //   //Add the course card popup here
  // }, [section]);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <img alt="logo" style={{ width: 800 }} src={titleImage} />
        <div style={{ margin: 20, marginTop: 40 }}>
          <div
            style={{
              marginLeft: 350,
              width: 400,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Dropdown
              disabled={false}
              options={yearList}
              onChange={(e) => setSelectedYear(e.value)}
              placeholder="Select a year:"
            />

            <Dropdown
              disabled={termDropdownDisabled}
              options={termList}
              onChange={(e) => setSelectedTerm(e.value)}
              placeholder="Select a term:"
            />
          </div>
          <h1
            style={{
              marginLeft: 400,
            }}
          >
            Select your courses
          </h1>
          <div style={{ display: "flex", flexDirection: "column", margin: 20 }}>
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <CourseCard
                  year={selectedYear ? selectedYear : "2021"}
                  term={selectedTerm ? selectedTerm : Term.SUMMER}
                ></CourseCard>

                <CourseCard
                  year={selectedYear ? selectedYear : "2021"}
                  term={selectedTerm ? selectedTerm : Term.SUMMER}
                ></CourseCard>

                <CourseCard
                  year={selectedYear ? selectedYear : "2021"}
                  term={selectedTerm ? selectedTerm : Term.SUMMER}
                ></CourseCard>
              </div>
            </>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 40,
              }}
            >
              <CourseCard
                year={selectedYear ? selectedYear : "2021"}
                term={selectedTerm ? selectedTerm : Term.SUMMER}
              ></CourseCard>

              <CourseCard
                year={selectedYear ? selectedYear : "2021"}
                term={selectedTerm ? selectedTerm : Term.SUMMER}
              ></CourseCard>

              <CourseCard
                year={selectedYear ? selectedYear : "2021"}
                term={selectedTerm ? selectedTerm : Term.SUMMER}
              ></CourseCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
