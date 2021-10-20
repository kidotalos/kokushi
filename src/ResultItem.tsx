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
