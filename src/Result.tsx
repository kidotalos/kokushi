import React, { useState, useEffect } from "react";
import styles from "./Result.module.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ResultItem from "./ResultItem";
import { List } from "@material-ui/core";
import { db } from "./firebase";

const Result: React.FC = () => {
  const [players, setPlayers] = useState([
    { id: "", name: "", ranking: 0, result: 0, point: 0 },
  ]);

  interface PLAYER {
    id: string;
    name: string;
    ranking: number;
    result: number;
    point: number;
  }
  // let playerOut: PLAYER[];

  useEffect(() => {
    const unSub = db
      .collection("players")
      .orderBy("result", "desc")
      .onSnapshot((snapshot) => {
        setPlayers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            ranking: doc.data().ranking,
            result: doc.data().result,
            point: doc.data().point,
          }))
        );
      });
    return () => unSub();
  }, []);

  const playerInput = (playerIn: PLAYER[]) => {
    for (let i = 0; i < playerIn.length; i++) {
      let playerRank = i + 1;
      let playerPoint = playerIn[i].result - 30000;
      switch (i) {
        case 0:
          playerIn[i].point = playerPoint + 40000; //式が値1に当てはまる場合に実行される
          break;
        case 1:
          playerIn[i].point = playerPoint + 10000; //式が値2に当てはまる場合に実行される
          break;
        case 2:
          playerIn[i].point = playerPoint - 10000; //式が値3に当てはまる場合に実行される
          break;
        case 3:
          playerIn[i].point = playerPoint - 20000; //式が値4に当てはまる場合に実行される
          break;
      }
      playerIn[i].ranking = playerRank;
      // console.log(playerIn[i].name);
    }
  };
  playerInput(players);
  console.log(players);

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
                result={player.result}
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
        {"入力画面へ"}
      </Button>
    </div>
  );
};

export default Result;
