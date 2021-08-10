import * as React from "react";
import { useTable } from "react-table";
import { Component, useEffect, useState } from "react";
import { DifficultyScore } from "../API";
import { TableStyles } from "../App.styles";
interface DifficultyProps {
  score: DifficultyScore;
}

export const DifficultyCard = (props: DifficultyProps) => {
  console.log(props.score.cddifficulty);
  const [profName, setProfName] = useState<string>("");
  const [cdGrade, setCdGrade] = useState<string>("");
  const [cdFailRate, setCdFailRate] = useState<number>(0);
  const [courseDifficulty, setCourseDifficulty] = useState<number>(0);
  const [algorithmScore, setAlgorithmScore] = useState<number>(0);
  const [rmpScore, setRmpScore] = useState<number>(0);
  const [rmpDifficulty, setRmpDifficulty] = useState<number>(0);
  const [cdDifficulty, setCdDifficulty] = useState<number>(0);

  useEffect(() => {
    setProfName(props.score.instructorName);
    setCdGrade(props.score.courseDiggerGrade);
    setCdFailRate(props.score.courseDiggerFailRate);
    setCourseDifficulty(props.score.courseDifficulty);
    setAlgorithmScore(props.score.algorithmScore);
    setRmpScore(props.score.rmpscore);
    setRmpDifficulty(props.score.rmpdifficulty);
    setCdDifficulty(props.score.cddifficulty);
  }, [props.score]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingTop: 20,
        marginTop: 5,
        paddingBottom: 20,
        justifyContent: "space-between",
      }}
    >
      <text style={{ padding: 10 }}>Instructor Name: {profName}</text>
      <text style={{ padding: 10 }}>CD Mean Grade: {cdGrade}</text>
      <text style={{ padding: 10 }}>CD Fail Rate: {cdFailRate}%</text>
      <text style={{ padding: 10 }}>CD Difficulty: {cdDifficulty}/10</text>
      {rmpScore == -1 ? (
        <text style={{ padding: 10 }}>RMP Score: Unknown</text>
      ) : (
        <text style={{ padding: 10 }}>RMP Score: {rmpScore}/5</text>
      )}
      {rmpScore == -1 ? (
        <text style={{ padding: 10 }}>RMP Difficulty: Unknown</text>
      ) : (
        <text style={{ padding: 10 }}>RMP Difficulty: {rmpDifficulty}/10</text>
      )}

      <text style={{ padding: 10 }}>
        Course Difficulty: {courseDifficulty}/10
      </text>
      <text style={{ padding: 10 }}>
        Overall Difficulty: {algorithmScore}/30
      </text>
    </div>
  );
};
