import * as React from "react";
import { Component, useState } from "react";
import {
  Course,
  Department,
  fetchCourses,
  fetchDepartments,
  fetchSections,
  Section,
  Term,
} from "../API";
import Dropdown from "react-dropdown";
import { useEffect } from "react";

interface courseCardProps {
  year?: string;
  term?: string;
}

const CourseCard = (props: courseCardProps) => {
  //Department Variables and functions
  useEffect(() => {
    let year: number = 0;
    if (props.year) {
      year = +props.year;
    } else {
      year = 2021;
    }
    if (props.term) {
      GetDepDropdownDetails(year, props.term).then(() => {
        setDepartmentDropdownDisabled(false);
      });
    } else {
      GetDepDropdownDetails(year, Term.SUMMER).then(() => {
        setDepartmentDropdownDisabled(false);
      });
    }
  });
  const [departmentDropdownDisabled, setDepartmentDropdownDisabled] =
    useState<boolean>(false);
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [departmentLabels, setDepartmentLabels] = useState<string[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>();

  const GetDepDropdownDetails = async (year: number, term: String) => {
    const departmentFetch = await fetchDepartments(year, term);
    setDepartmentList(departmentFetch);
    let labels: string[] = [];
    for (let department of departmentList) {
      labels.push(department.text);
    }
    setDepartmentLabels(labels);
  };

  useEffect(() => {
    let year: number = 0;
    if (props.year) {
      year = +props.year;
    } else {
      year = 2021;
    }
    if (props.term && selectedDepartment) {
      GetCourseDropdownDetails(year, props.term, selectedDepartment).then(
        () => {
          setCourseDropdownDisabled(false);
        }
      );
    } else {
      GetCourseDropdownDetails(year, Term.SUMMER, "cmpt").then(() => {
        setCourseDropdownDisabled(false);
      });
    }
  }, [selectedDepartment]);

  //Course Variables and functions
  const [courseDropdownDisabled, setCourseDropdownDisabled] =
    useState<boolean>(true);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [courseLabels, setCourseLabels] = useState<string[]>([]);
  const [course, setCourse] = useState<string>();

  const GetCourseDropdownDetails = async (
    year: number,
    term: String,
    dep: String
  ) => {
    const courseFetch = await fetchCourses(year, term, dep);
    setCourseList(courseFetch);
    let labels: string[] = [];
    for (let course of courseList) {
      labels.push(course.text);
    }
    setCourseLabels(labels);
  };

  useEffect(() => {
    let year: number = 0;
    if (props.year) {
      year = +props.year;
    } else {
      year = 2021;
    }
    if (props.term && selectedDepartment && course) {
      GetSectionDropdownDetails(
        year,
        props.term,
        selectedDepartment,
        course
      ).then(() => {
        setSectionDropdownDisabled(false);
      });
    } else {
      GetSectionDropdownDetails(year, Term.SUMMER, "cmpt", "383").then(() => {
        setSectionDropdownDisabled(false);
      });
    }
  }, [course]);

  //Section Variables and functions
  const [sectionDropdownDisabled, setSectionDropdownDisabled] =
    useState<boolean>(true);
  const [sectionList, setSectionList] = useState<Section[]>([]);
  const [sectionLabels, setSectionLabels] = useState<string[]>([]);
  const [section, setSection] = useState<string>();

  const GetSectionDropdownDetails = async (
    year: number,
    term: String,
    dep: String,
    course: String
  ) => {
    const sectionFetch = await fetchSections(year, term, dep, course);
    setSectionList(sectionFetch);
    let labels: string[] = [];
    for (let section of sectionList) {
      labels.push(section.text);
    }
    setSectionLabels(labels);
  };

  useEffect(() => {
    //Add the course card popup here
  }, [section]);

  return (
    <>
      <div style={{ height: 700, width: 250 }}>
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
      </div>
    </>
  );
};

export default CourseCard;
