import React, { useState, useEffect } from "react";
import styles from "./Result.module.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import playerInput from "./ResultFN";
import ResultItem from "./ResultItem";
import { List } from "@material-ui/core";
import { db } from "./firebase";

const Result: React.FC = () => {
  const [players, setPlayers] = useState([
    { id: "", name: "", ranking: 0, result: 0, point: "" },
  ]);

  useEffect(() => {
    const unSub = db
      .collection("players")
      .orderBy("result", "desc")
      .onSnapshot((snapshot) => {
        // firestoreで管理しているのはnameとresultだけ
        const playersDB = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          ranking: 0,
          result: doc.data().result,
          point: "",
        }));
        const resultplayers = playerInput(playersDB);
        resultplayers[0].point = (-(
          Number(resultplayers[1].point) +
          Number(resultplayers[2].point) +
          Number(resultplayers[3].point)
        )).toString();
        setPlayers(resultplayers);
      });
    return () => unSub();
  }, []);

  return (
    <div className={styles.result__body}>
      <h1 className={styles.title__app}>麻雀の点数計算をするアプリだよ</h1>
      <img
        className={styles.header__img}
        src={`${process.env.PUBLIC_URL}/header.jpg`}
        alt="Logo"
      />
      <div>
        <h2>👑結果はいかに👑</h2>
      </div>
      <div className={styles.player__result__all}>
        <List>
          {players.map((player) => (
            <div className={styles.player__result}>
              <ResultItem
                key={player.id}
                id={player.id}
                name={player.name}
                ranking={player.ranking}
                point={player.point}
              />
            </div>
          ))}
        </List>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        component={Link}
        to="/"
      >
        入力画面へ
      </Button>
    </div>
  );
};

export default Result;
