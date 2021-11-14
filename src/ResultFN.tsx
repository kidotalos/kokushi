import React from "react";

interface PLAYER {
  id: string;
  name: string;
  ranking: number;
  result: number;
  point: string;
}

const playerInput = (playerIn: PLAYER[]) => {
  for (let i = 0; i < playerIn.length; i++) {
    // プロパティ系
    let playerRank = i + 1; // とりあえずランキングはindexが0スタートなので1を足して順位決め
    let playerFinalResult = playerIn[i].result - 30000; // ３万点返ししたあとのポイント
    let playerPoint: number = 0; // 文字列に変換する前のポイント
    let playerBeforeGosyaPoint: string = ""; // 五捨六入する前のポイント
    let playerReplaceGosyaPoint: string = ""; // 4を5に置換したあとのポイント
    let playerAfterGosyaPoint: string = ""; // 五捨六入したあとのポイント

    // 五捨六入をしたいが形式的に四捨五入ですませるため、100の位が5だと4で返す
    // こうするとで後は四捨五入するだけでよくなる
    let checkGosya = (playerBeforeGosyaPoint: string): string => {
      let chars: string[] = [];
      let replace = "";
      // 100の位が5かどうか判定
      if (playerBeforeGosyaPoint.substr(-3, 1) === "5") {
        chars = Array.from(playerBeforeGosyaPoint);
        for (let i = 0; i < chars.length; i++) {
          // 100の位の5を4で上書きする
          if (chars.length - i === 3) {
            chars[i] = "4";
          }
          replace = replace + chars[i];
        }
        // 5を4にしたやつ返してる
        return replace;
      } else {
        return playerBeforeGosyaPoint;
      }
    };

    // 四捨五入するメソッド
    let checkPoint = (playerReplaceGosyaPoint: string): string => {
      let pointStr = playerReplaceGosyaPoint;
      let pointNum = Number(pointStr);
      let pointStrAfterSisya = Math.round(pointNum / 1000) * 1000; //100の位を四捨五入
      let pointStrRe = pointStrAfterSisya.toString();

      // まずはその値がプラスかマイナスか見る
      // プラスとマイナスで四捨五入する場所が変わるため
      if (pointNum > 0) {
        // 後は桁数によって返すポイントを決める
        if (pointStr.length === 6) {
          return pointStrRe.substr(0, 3);
        } else if (pointStr.length === 5) {
          // 100000までいっていたら3桁返す
          if (pointStrRe === "100000") {
            return pointStrRe.substr(0, 3);
          } else {
            return pointStrRe.substr(0, 2);
          }
        } else if (pointStr.length === 4) {
          // 10000までいっていたら2桁返す
          if (pointStrRe === "10000") {
            return pointStrRe.substr(0, 2);
          } else {
            return pointStrRe.substr(0, 1);
          }
        } else {
          return pointStrRe.substr(0, 1);
        }
        // こっからはマイナスの場合の処理
      } else if (pointStr.length === 6) {
        // 上から3桁目を四捨五入
        return pointStrRe.substr(0, 3);
      } else if (pointStr.length === 5) {
        // -10000までいっていたら3桁返す
        if (pointStrRe === "10000") {
          return pointStrRe.substr(0, 3);
        } else {
          return pointStrRe.substr(0, 2);
        }
      } else {
        // -1000までいっていたら2桁返す
        if (pointStrRe === "1000") {
          return pointStrRe.substr(0, 2);
        } else {
          return pointStrRe.substr(0, 1);
        }
      }
    };

    switch (i) {
      case 0:
        playerIn[i].point = "";
        break;
      case 1:
        playerPoint = playerFinalResult + 10000; //式が値2に当てはまる場合に実行される
        playerBeforeGosyaPoint = playerPoint.toString();
        playerReplaceGosyaPoint = checkGosya(playerBeforeGosyaPoint);
        playerAfterGosyaPoint = checkPoint(playerReplaceGosyaPoint);
        playerIn[i].point = playerAfterGosyaPoint;
        break;
      case 2:
        playerPoint = playerFinalResult - 10000; //式が値3に当てはまる場合に実行される
        playerBeforeGosyaPoint = playerPoint.toString();
        playerReplaceGosyaPoint = checkGosya(playerBeforeGosyaPoint);
        playerAfterGosyaPoint = checkPoint(playerReplaceGosyaPoint);
        playerIn[i].point = playerAfterGosyaPoint;
        break;
      case 3:
        playerPoint = playerFinalResult - 20000; //式が値4に当てはまる場合に実行される
        playerBeforeGosyaPoint = playerPoint.toString();
        playerReplaceGosyaPoint = checkGosya(playerBeforeGosyaPoint);
        playerAfterGosyaPoint = checkPoint(playerReplaceGosyaPoint);
        playerIn[i].point = playerAfterGosyaPoint;
        break;
    }
    // ランキングを代入
    playerIn[i].ranking = playerRank;
  }
  return playerIn;
};

export default playerInput;
