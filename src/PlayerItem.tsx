import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from "./firebase";
import styles from "./PlayerItem.module.css";

interface PROPS {
  id: string;
  name: string;
  result: number;
}

const PlayerItem: React.FC<PROPS> = (props) => {
  const [result, setResult] = useState(props.result);

  const editResult = () => {
    if (isNaN(result)) {
      alert("数字を入れてください");
      setResult(0);
    } else {
      db.collection("players")
        .doc(props.id)
        .set({ result: result }, { merge: true });
    }
  };

  const deleteResult = () => {
    db.collection("players").doc(props.id).delete();
  };

  return (
    <div className={styles.player}>
      <div className={styles.player__details}>
        <div className={styles.player__name}>
          <PersonIcon />
          <h3>{props.name}</h3>
        </div>
        <h5>入力した点数：{props.result}</h5>
      </div>
      <div className={styles.player__result}>
        <div className={styles.edit__result}>
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="点数は？"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setResult(parseInt(e.target.value))
            }
          />
        </div>

        <button className="button-result" onClick={editResult}>
          <EditOutlinedIcon />
        </button>
        <button className="button-delete-result" onClick={deleteResult}>
          <DeleteOutlineOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default PlayerItem;
