import React from "react";
import { useState } from "react";
import { Term, fetchDepartments, Department } from "./API";
import { Button } from "react-bootstrap";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useEffect } from "react";

const App = () => {
  const yearList: string[] = ["2019", "2020", "2021"];
  const [selectedYear, setSelectedYear] = useState<string>();

  useEffect(() => {
    setTermDropDownDisabled(false);
  }, [selectedYear]);

  const termList = [Term.SPRING, Term.SUMMER, Term.FALL];
  const [termDropdownDisabled, setTermDropDownDisabled] =
    useState<boolean>(true);
  const [selectedTerm, setSelectedTerm] = useState<string>();

  useEffect(() => {
    console.log(selectedTerm);
    let year: number = 0;
    if (selectedYear) {
      year = +selectedYear;
    } else {
      year = 2021;
    }
    if (selectedTerm) {
      GetDropdownDetails(year, selectedTerm).then(() => {
        setDepartmentDropdownDisabled(false);
      });
    } else {
      GetDropdownDetails(year, Term.SUMMER).then(() => {
        setDepartmentDropdownDisabled(false);
      });
    }
  }, [selectedTerm]);

  const [departmentDropdownDisabled, setDepartmentDropdownDisabled] =
    useState<boolean>(true);
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [departmentLabels, setDepartmentLabels] = useState<string[]>([]);

  const GetDropdownDetails = async (year: number, term: String) => {
    const departmentFetch = await fetchDepartments(year, term);
    setDepartmentList(departmentFetch);
    let labels: string[] = [];
    for (let department of departmentList) {
      labels.push(department.text);
    }
    setDepartmentLabels(labels);
  };

  return (
    <div className="App">
      <h1>SFU Schedule Difficulty Calculator</h1>

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

      <Dropdown
        disabled={departmentDropdownDisabled}
        options={departmentLabels}
        onChange={(res) => {
          console.log(res.label);
        }}
        placeholder="Select a department:"
      />
    </div>
  );
};

export default App;
