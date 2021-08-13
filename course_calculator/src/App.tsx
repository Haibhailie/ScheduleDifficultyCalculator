import React from "react";
import { useState } from "react";
import {
  defaultDifficulty,
  DifficultyScore,
  OverallDifficulty,
  Term,
} from "./API";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useEffect } from "react";
import CourseCard from "./components/CourseCard";
import titleImage from "./images/title.jpg";
import { GlobalStyle } from "./App.styles";
import { Button } from "react-bootstrap";
import { OverallDifficultyCard } from "./components/OverallDifficulty";
import { LoadingComp } from "./components/LoadingComp";

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function refreshPage() {
  window.location.reload(false);
}

const App = () => {
  const forceUpdate = useForceUpdate();
  //Year Variables and functions
  const yearList: string[] = ["2019", "2020", "2021"];
  const [selectedYear, setSelectedYear] = useState<string>();
  const termList = [Term.SPRING, Term.SUMMER, Term.FALL];
  const [termDropdownDisabled, setTermDropDownDisabled] =
    useState<boolean>(true);
  const [selectedTerm, setSelectedTerm] = useState<string>();
  const [viewCards, setViewCards] = useState<boolean>(false);

  //Different Courses to calculate overall score in main menu
  const [courseA, setCourseA] = useState<DifficultyScore>(defaultDifficulty);
  const [courseB, setCourseB] = useState<DifficultyScore>(defaultDifficulty);
  const [courseC, setCourseC] = useState<DifficultyScore>(defaultDifficulty);
  const [courseD, setCourseD] = useState<DifficultyScore>(defaultDifficulty);
  const [courseE, setCourseE] = useState<DifficultyScore>(defaultDifficulty);
  const [courseF, setCourseF] = useState<DifficultyScore>(defaultDifficulty);
  useEffect(() => {
    setTermDropDownDisabled(false);
  }, [selectedYear]);

  //Term Variables and functions
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
              marginRight: 320,
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
          <Button
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              height: 40,
              width: 80,
              marginTop: 10,
              marginLeft: 510,
            }}
            onClick={() => setViewCards(true)}
          >
            Add Course
          </Button>
          {viewCards ? (
            <>
              <h1
                style={{
                  marginLeft: 400,
                }}
              >
                Select your courses
              </h1>

              <div
                style={{ display: "flex", flexDirection: "column", margin: 20 }}
              >
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
                      setCardState={setCourseA}
                      updateParent={forceUpdate}
                    ></CourseCard>

                    <CourseCard
                      year={selectedYear ? selectedYear : "2021"}
                      term={selectedTerm ? selectedTerm : Term.SUMMER}
                      setCardState={setCourseB}
                      updateParent={forceUpdate}
                    ></CourseCard>

                    <CourseCard
                      year={selectedYear ? selectedYear : "2021"}
                      term={selectedTerm ? selectedTerm : Term.SUMMER}
                      setCardState={setCourseC}
                      updateParent={forceUpdate}
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
                    setCardState={setCourseD}
                    updateParent={forceUpdate}
                  ></CourseCard>

                  <CourseCard
                    year={selectedYear ? selectedYear : "2021"}
                    term={selectedTerm ? selectedTerm : Term.SUMMER}
                    setCardState={setCourseE}
                    updateParent={forceUpdate}
                  ></CourseCard>

                  <CourseCard
                    year={selectedYear ? selectedYear : "2021"}
                    term={selectedTerm ? selectedTerm : Term.SUMMER}
                    setCardState={setCourseF}
                    updateParent={forceUpdate}
                  ></CourseCard>
                </div>
              </div>
              <div
                style={{
                  marginLeft: 200,
                }}
              >
                <div>
                  <OverallDifficultyCard
                    courseA={courseA}
                    courseB={courseB}
                    courseC={courseC}
                    courseD={courseD}
                    courseE={courseE}
                    courseF={courseF}
                  ></OverallDifficultyCard>
                </div>
              </div>
              <Button
                style={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  height: 60,
                  width: 100,
                  marginTop: 30,
                  marginLeft: 500,
                  color: "white",
                  fontWeight: "bold",
                  background: "red",
                }}
                onClick={() => {
                  refreshPage();
                }}
              >
                Refresh All
              </Button>
            </>
          ) : (
            <>
              <h1
                style={{
                  marginLeft: 400,
                }}
              >
                Enter the year and term
              </h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
