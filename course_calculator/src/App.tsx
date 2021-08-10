import React from "react";
import { useState } from "react";
import { Term } from "./API";
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
