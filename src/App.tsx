import { FormControl, List, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import AddCircleOutlineOutlined from "@material-ui/icons/AddCircleOutlineOutlined";
import PlayerItem from "./PlayerItem";

const App: React.FC = () => {
  const [players, setPlayers] = useState([{ id: "", name: "", result: 0 }]);
  const [inputName, setInputName] = useState("");
  const [inputResult, setInputResult] = useState(0);
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
    db.collection("players").add({ name: inputName, result: inputResult });
    setInputName("");
    setInputResult(0);
  };

  return (
    <div className="App">
      <h1 className="title-app">麻雀の点数計算をするアプリだよ</h1>
      <img
        className="header-img"
        src={`${process.env.PUBLIC_URL}/header.jpg`}
        alt="Logo"
      />
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
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="点数は？"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputResult(parseInt(e.target.value))
          }
        />
      </FormControl>
      <button disabled={!inputName || !inputResult} onClick={playerDetails}>
        <AddCircleOutlineOutlined />
      </button>

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
    </div>
  );
};

export default App;
