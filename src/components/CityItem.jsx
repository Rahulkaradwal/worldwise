import styles from "./CityItem.module.css";

const formateDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date } = city;

  return (
    <div className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <span className={styles.name}>{cityName}</span>
      <time className={styles.date}>{formateDate(date)} </time>
      <button className={styles.deleteBtn}>&times;</button>
    </div>
  );
}

export default CityItem;
