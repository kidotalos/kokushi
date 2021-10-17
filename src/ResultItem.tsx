import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from "./firebase";
import styles from "./ResultItem.module.css";

interface PROPS {
  id: string;
  name: string;
  ranking: number;
  result: number;
  point: string;
}

const ResultItem: React.FC<PROPS> = (props) => {
  return (
    <div className={styles.result}>
      <h3>あなたは{props.ranking}ちゃだよ</h3>
      <h4>{props.name}</h4>
      <h4>{props.point}</h4>
    </div>
  );
};

export default ResultItem;
