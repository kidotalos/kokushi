import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { ListItem, TextField, Grid } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { db } from "./firebase";

interface PROPS {
  id: string;
  name: string;
  result: number;
}

const PlayerItem: React.FC<PROPS> = (props) => {
  const [name, setName] = useState(props.name);
  const [result, setResult] = useState(props.result);
  return (
    <ListItem>
      <h2>{props.name}</h2>
      <h3>{props.result}</h3>
      <Grid container justifyContent="flex-end">
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          label="名前の編集？"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
      </Grid>
    </ListItem>
  );
};

export default PlayerItem;
