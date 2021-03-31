import React from "react";
import styles from "../styles/components/skeleton.module.scss";

export interface LoadingCardProps {
  count?: number;
}

const LoadingCard: React.SFC<LoadingCardProps> = ({ count }) => {
  return (
    <div className={styles.skeletons_container}>
      {[...Array(count)].map((e, i) => {
        return (
          <div key={i} className={styles.card}>
            <div className={styles.card_image}></div>
            <div className={styles.card_title}></div>
            <div className={styles.card_description}></div>
          </div>
        );
      })}
    </div>
  );
};

LoadingCard.defaultProps = {
  count: 6
};

export default LoadingCard;
