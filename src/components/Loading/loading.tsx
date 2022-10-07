import React from 'react';
import cn from 'classnames';
import { ILoading } from './loading.types';
import styles from './loading.module.scss';

export const Loading = ({ absolute, classNameIndicator }: ILoading) => (
  <div
    className={cn(styles.container, {
      [styles.containerAbsolute]: absolute,
    })}
  >
    <div
      className={cn(styles.indicator, classNameIndicator, {
        [styles.indicatorAbsolute]: absolute,
      })}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);
