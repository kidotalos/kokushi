import { FormControl, List, Paper, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import AddCircleOutlineOutlined from "@material-ui/icons/AddCircleOutlineOutlined";
import PlayerItem from "./PlayerItem";
import styles from "./App.module.css";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const App: React.FC = () => {
  const [players, setPlayers] = useState([{ id: "", name: "", result: 0 }]);
  const [inputName, setInputName] = useState("");
  // この画面が呼ばれるごとに実行される（firebaseの中を見に行っている）
  useEffect(() => {
    const unSub = db.collection("players").onSnapshot((snapshot) => {
      setPlayers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          result: doc.data().result,
        }))
      );
    });
    return () => unSub();
  }, []);

  const playerDetails = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 入力された名前と結果はとりあえず０で登録
    db.collection("players").add({
      name: inputName,
      ranking: 0,
      result: 0,
      point: 0,
    });
    setInputName("");
  };

  return (
    <div className={styles.App}>
      <h1 className={styles.title__app}>麻雀の点数計算をするアプリだよ</h1>
      <img
        className={styles.header__img}
        src={`${process.env.PUBLIC_URL}/header.jpg`}
        alt="Logo"
      />
      <div className={styles.input__name}>
        <div className={styles.name__box}>
          <FormControl>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              label="名前は？"
              value={inputName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputName(e.target.value)
              }
            />
          </FormControl>
        </div>

        <div className={styles.name__button}>
          <button disabled={!inputName} onClick={playerDetails}>
            <AddCircleOutlineOutlined />
          </button>
        </div>
      </div>
      <List>
        {players.map((player) => (
          <PlayerItem
            key={player.id}
            id={player.id}
            name={player.name}
            result={player.result}
          />
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        component={Link}
        to="/result"
      >
        {"結果を見る"}
      </Button>
    </div>
  );
};

export default App;
