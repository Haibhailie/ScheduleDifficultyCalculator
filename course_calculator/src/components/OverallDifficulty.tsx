import * as React from "react";
import { useEffect } from "react";
import { Component, useState } from "react";
import { Button } from "react-bootstrap";
import { DifficultyScore, OverallDifficulty } from "../API";

interface OverallDifficultyProps {
  courseA: DifficultyScore;
  courseB: DifficultyScore;
  courseC: DifficultyScore;
  courseD: DifficultyScore;
  courseE: DifficultyScore;
  courseF: DifficultyScore;
}

function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const calculateOverallDifficulty = (courses: DifficultyScore[]) => {
  let localCourseList: string = "";
  let localAlgorithmDifficulty = 0;
  let localRmpDifficulty = 0;
  let localCdDifficulty = 0;
  let localExpectedWorkload = 0;

  for (let presentCourse of courses) {
    if (presentCourse.courseName != "") {
      localCourseList = localCourseList + presentCourse.courseName + ", ";
      localAlgorithmDifficulty =
        localAlgorithmDifficulty + presentCourse.algorithmScore;
      localRmpDifficulty = localRmpDifficulty + presentCourse.rmpdifficulty;
      localCdDifficulty = localCdDifficulty + presentCourse.cddifficulty;
    }
    if (presentCourse.overallDifficulty == 0) {
      localExpectedWorkload = localExpectedWorkload + 0;
    } else if (presentCourse.overallDifficulty < 10) {
      localExpectedWorkload = localExpectedWorkload + 4;
    } else if (presentCourse.overallDifficulty < 15) {
      localExpectedWorkload = localExpectedWorkload + 6;
    } else if (presentCourse.overallDifficulty < 20) {
      localExpectedWorkload = localExpectedWorkload + 8;
    } else if (presentCourse.overallDifficulty < 20) {
      localExpectedWorkload = localExpectedWorkload + 12;
    } else if (presentCourse.overallDifficulty < 25) {
      localExpectedWorkload = localExpectedWorkload + 14;
    } else if (presentCourse.overallDifficulty < 30) {
      localExpectedWorkload = localExpectedWorkload + 16;
    }
  }
  let calculatedOverallDifficulty: OverallDifficulty = {
    courseList: localCourseList,
    algorithmDifficulty: localAlgorithmDifficulty,
    rmpDifficulty: localRmpDifficulty,
    cdDifficulty: localCdDifficulty,
    expectedWorkload: localExpectedWorkload,
  };
  return calculatedOverallDifficulty;
};

export const OverallDifficultyCard = (props: OverallDifficultyProps) => {
  const forceUpdate = useForceUpdate();
  let courses: DifficultyScore[] = [
    props.courseA,
    props.courseB,
    props.courseC,
    props.courseD,
    props.courseE,
    props.courseF,
  ];

  useEffect(() => {
    courses = [
      props.courseA,
      props.courseB,
      props.courseC,
      props.courseD,
      props.courseE,
      props.courseF,
    ];
  }, [
    props.courseA,
    props.courseB,
    props.courseC,
    props.courseD,
    props.courseE,
    props.courseF,
  ]);

  const [overallDifficultyData, setOverallDifficultyData] =
    useState<OverallDifficulty>(calculateOverallDifficulty(courses));
  const [showDifficultyCard, setShowDifficultyCard] = useState<boolean>(false);

  const handleShowCard = () => {
    setShowDifficultyCard(true);
    setOverallDifficultyData(calculateOverallDifficulty(courses));
  };

  return (
    <div>
      {showDifficultyCard ? (
        <div
          style={{
            alignContent: "center",
            alignItems: "center",
            justifyContent: "flex-start",
            height: 320,
            width: 650,
            paddingTop: 20,
            paddingRight: 30,
            paddingLeft: 30,
            border: 5,
            borderWidth: 2,
            borderStyle: "solid",
            borderRadius: 25,
            flexDirection: "column",
            display: "flex",
          }}
        >
          <h2>Overall Difficulty</h2>
          <text style={{ padding: 7 }}>
            Course List: {overallDifficultyData.courseList}
          </text>
          <text style={{ padding: 7 }}>
            Ratemyprof Difficulty: {overallDifficultyData.rmpDifficulty}
          </text>
          <text style={{ padding: 7 }}>
            CourseDigger Difficulty: {overallDifficultyData.cdDifficulty}
          </text>
          <text style={{ padding: 7 }}>
            Algorithm difficulty: {overallDifficultyData.algorithmDifficulty}
          </text>
          <text style={{ padding: 7 }}>
            Expect to spend at least {overallDifficultyData.expectedWorkload}{" "}
            hours every week.
          </text>

          <Button
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              height: 40,
              width: 80,
              marginTop: 10,
              color: "white",
              background: "red",
            }}
            onClick={() => {
              setShowDifficultyCard(false);
            }}
          >
            Close
          </Button>
        </div>
      ) : (
        <Button
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            height: 80,
            width: 140,
            marginTop: 10,
            marginLeft: 280,
            color: "white",
            fontSize: "40",
            fontWeight: "bold",
            background: "green",
          }}
          onClick={() => {
            handleShowCard();
          }}
        >
          Calculate Difficulty
        </Button>
      )}
    </div>
  );
};
