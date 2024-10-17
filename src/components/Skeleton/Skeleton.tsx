import React from 'react';
import styles from './Skeleton.module.css';

type SkeletonType = 'bar' | 'playlist' | 'selection';

interface SkeletonProps {
  type: SkeletonType;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({ type, count = 1 }) => {
  const renderSkeleton = (skeletonType: SkeletonType) => {
    switch (skeletonType) {
      case 'bar':
        return (
          <div className={styles.barContainer} role="status" aria-label="Loading track">
            <div className={styles.barImage}></div>
            <div className={styles.barTextContainer}>
              <div className={styles.barText}></div>
              <div className={styles.barText}></div>
            </div>
          </div>
        );
      case 'playlist':
        return (
          <div className={styles.playlistContainer} role="status" aria-label="Loading playlist track">
            <div className={styles.playlistImage}></div>
            <div className={styles.playlistTextContainer}>
              <div className={styles.playlistText}></div>
              <div className={styles.playlistText}></div>
              <div className={styles.playlistText}></div>
            </div>
          </div>
        );
      case 'selection':
        return (
          <div className={styles.selectionContainer} role="status" aria-label="Loading selection">
            <div className={styles.selectionImage}></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.skeletonWrapper}>
      {Array(count).fill(null).map((_, index) => (
        <div key={index} className={styles.skeletonItem}>
          {renderSkeleton(type)}
        </div>
      ))}
    </div>
  );
};

export default Skeleton;