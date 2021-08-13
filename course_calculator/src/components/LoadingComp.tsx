import * as React from "react";
import { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export const LoadingComp = () => {
  return (
    <div>
      <Loader type="Circles" color="red" height={60} width={60} />
    </div>
  );
};
