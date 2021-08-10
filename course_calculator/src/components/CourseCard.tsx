import * as React from "react";
import { Component, useState } from "react";
import {
  DifficultyScore,
  fetchCourseDifficultyData,
  fetchCourses,
  fetchDepartments,
  fetchSections,
  Term,
} from "../API";
import Dropdown from "react-dropdown";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { DifficultyCard } from "./DifficultyCard";

interface courseCardProps {
  year: string;
  term: string;
}

const CourseCard = (props: courseCardProps) => {
  const [difficultyScore, setDifficultyScore] = useState<DifficultyScore>();
  //Department Variables and functions
  useEffect(() => {
    let year: number = 0;
    if (props.year) {
      year = +props.year;
    } else {
      year = 2021;
    }
    const GetDepDropdownDetails = async (year: number, term: String) => {
      const departmentFetch = await fetchDepartments(year, term);
      let labels: string[] = [];
      for (let department of departmentFetch) {
        labels.push(department.text);
      }
      return labels;
    };
    GetDepDropdownDetails(year, props.term ? props.term : Term.SUMMER).then(
      (res) => setDepartmentLabels(res)
    );
    console.log(departmentLabels);
  }, []);

  const [departmentDropdownDisabled, setDepartmentDropdownDisabled] =
    useState<boolean>(false);
  const [departmentLabels, setDepartmentLabels] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>();

  useEffect(() => {
    let year: number = 0;
    if (props.year) {
      year = +props.year;
    } else {
      year = 2021;
    }
    const GetCourseDropdownDetails = async (
      year: number,
      term: String,
      dep: String
    ) => {
      let courseFetch = await fetchCourses(year, term, dep);
      let labels: string[] = [];
      for (let course of courseFetch) {
        labels.push(course.text);
      }
      return labels;
    };
    GetCourseDropdownDetails(
      year,
      props.term ? props.term : Term.SUMMER,
      selectedDepartment ? selectedDepartment : "cmpt"
    )
      .then((res) => setCourseLabels(res))
      .then(() => setCourseDropdownDisabled(false));
  }, [selectedDepartment]);

  //Course Variables and functions
  const [courseDropdownDisabled, setCourseDropdownDisabled] =
    useState<boolean>(true);
  const [courseLabels, setCourseLabels] = useState<string[]>([]);
  const [selectedCourse, setCourse] = useState<string>();

  useEffect(() => {
    let year: number = 0;
    if (props.year) {
      year = +props.year;
    } else {
      year = 2021;
    }
    const GetSectionDropdownDetails = async (
      year: number,
      term: String,
      dep: String,
      course: String
    ) => {
      const sectionFetch = await fetchSections(year, term, dep, course);
      let labels: string[] = [];
      for (let section of sectionFetch) {
        labels.push(section.text);
      }
      return labels;
    };
    GetSectionDropdownDetails(
      year,
      props.term ? props.term : Term.SUMMER,
      selectedDepartment ? selectedDepartment : "cmpt",
      selectedCourse ? selectedCourse : "383"
    )
      .then((res) => setSectionLabels(res))
      .then(() => setSectionDropdownDisabled(false));
  }, [selectedCourse]);

  //Section Variables and functions
  const [sectionDropdownDisabled, setSectionDropdownDisabled] =
    useState<boolean>(true);
  const [sectionLabels, setSectionLabels] = useState<string[]>([]);
  const [selectedSection, setSection] = useState<string>();

  const [difficultyVisible, setDifficultyVisible] = useState<boolean>(false);

  useEffect(() => {
    let year: number = 0;
    if (props.year) {
      year = +props.year;
    } else {
      year = 2021;
    }
    const GetSectionDropdownDetails = async (
      year: number,
      term: String,
      dep: String,
      course: String,
      section: String
    ) => {
      let presentCourseDifficulty: DifficultyScore =
        await fetchCourseDifficultyData(year, term, dep, course, section);
      return presentCourseDifficulty;
    };
    GetSectionDropdownDetails(
      year,
      props.term ? props.term : Term.SUMMER,
      selectedDepartment ? selectedDepartment : "cmpt",
      selectedCourse ? selectedCourse : "383",
      selectedSection ? selectedSection : "D100"
    ).then((res) => setDifficultyScore(res));
  }, [difficultyVisible]);

  let defaultDifficultyScore: DifficultyScore = {
    instructorName: "Greg Baker",
    courseName: "CMPT 383",
    courseDiggerGrade: "A",
    courseDiggerFailRate: 0,
    courseDifficulty: 0,
    algorithmScore: 0,
    overallDifficulty: 0,
    rmpscore: 0,
    rmpdifficulty: 0,
    cddifficulty: 0,
  };

  return (
    <>
      <div
        style={{
          height: 550,
          width: 250,
          paddingTop: 20,
          paddingRight: 30,
          paddingLeft: 30,
          border: 5,
          borderWidth: 2,
          borderStyle: "solid",
          borderRadius: 25,
          margin: 20,
        }}
      >
        <Dropdown
          disabled={departmentDropdownDisabled}
          options={departmentLabels}
          onChange={(e) => setSelectedDepartment(e.value)}
          placeholder="Select a department:"
        />

        <Dropdown
          disabled={courseDropdownDisabled}
          options={courseLabels}
          onChange={(e) => setCourse(e.value)}
          placeholder="Select a course:"
        />

        <Dropdown
          disabled={sectionDropdownDisabled}
          options={sectionLabels}
          onChange={(e) => setSection(e.value)}
          placeholder="Select a section:"
        />

        <Button
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            height: 40,
            width: 80,
            marginTop: 10,
            marginLeft: 80,
          }}
          onClick={() => setDifficultyVisible(true)}
        >
          Add Course
        </Button>
        {difficultyVisible ? (
          <DifficultyCard
            score={difficultyScore ? difficultyScore : defaultDifficultyScore}
          ></DifficultyCard>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CourseCard;
