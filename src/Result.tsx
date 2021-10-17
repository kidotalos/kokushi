import React, { useState, useEffect } from "react";
import styles from "./Result.module.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ResultItem from "./ResultItem";
import { List } from "@material-ui/core";
import { db } from "./firebase";

const Result: React.FC = () => {
  const [players, setPlayers] = useState([
    { id: "", name: "", ranking: 0, result: 0, point: "" },
  ]);

  interface PLAYER {
    id: string;
    name: string;
    ranking: number;
    result: number;
    point: string;
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
      // 文字列に変換する前のポイント
      let playerPoint: number = 0;
      // 五捨六入する前のポイント
      let playerBeforeGosyaPoint: string = "";
      // 五捨六入したあとのポイント
      let playerAfterGosyaPoint: string = "";
      // 最終的なポイント
      let playerFinallGosyaPoint: string = "";
      let playerRank = i + 1;
      // ３万点返ししたあとのポイント
      let playerFinalResult = playerIn[i].result - 30000;
      // 五捨六入したあとのポイントするか確かめるメソッド
      let checkGosya = (playerBeforeGosyaPoint: string): string => {
        let chars: string[] = [];
        let replace = "";
        if (playerBeforeGosyaPoint.substr(-3, 1) === "5") {
          chars = Array.from(playerBeforeGosyaPoint);
          for (let i = 0; chars.length; i++) {
            if (chars.length - i === 3) {
              chars[i] = "4";
            }
            replace = replace + chars[i];
          }
          return replace;
        }
      };
      switch (i) {
        case 0:
          playerPoint = playerFinalResult + 40000; //式が値1に当てはまる場合に実行される
          playerBeforeGosyaPoint = playerPoint.toString();
          playerAfterGosyaPoint = checkGosya(playerBeforeGosyaPoint);
          playerFinallGosyaPoint = playerAfterGosyaPoint.substr(0, 2);
          playerIn[i].point = playerFinallGosyaPoint;
          break;
        case 1:
          playerPoint = playerFinalResult + 10000; //式が値2に当てはまる場合に実行される
          playerBeforeGosyaPoint = playerPoint.toString();
          playerAfterGosyaPoint = checkGosya(playerBeforeGosyaPoint);
          playerFinallGosyaPoint = playerAfterGosyaPoint.substr(0, 2);
          playerIn[i].point = playerFinallGosyaPoint;
          break;
        case 2:
          playerPoint = playerFinalResult - 10000; //式が値3に当てはまる場合に実行される
          playerBeforeGosyaPoint = playerPoint.toString();
          playerAfterGosyaPoint = checkGosya(playerBeforeGosyaPoint);
          playerFinallGosyaPoint = playerAfterGosyaPoint.substr(0, 2);
          playerIn[i].point = playerFinallGosyaPoint;
          break;
        case 3:
          playerPoint = playerFinalResult - 20000; //式が値4に当てはまる場合に実行される
          playerBeforeGosyaPoint = playerPoint.toString();
          playerAfterGosyaPoint = checkGosya(playerBeforeGosyaPoint);
          playerFinallGosyaPoint = playerAfterGosyaPoint.substr(0, 2);
          playerIn[i].point = playerFinallGosyaPoint;
          break;
      }
      playerIn[i].ranking = playerRank;
      // console.log(playerIn[i].name);
    }
  };
  playerInput(players);

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
