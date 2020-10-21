import React from 'react';
import { useInterval } from 'src/common/hooks/use-interval';

import styles from './styles.module.scss';
import Slider from 'react-slick';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import MinimizeRoundedIcon from '@material-ui/icons/MinimizeRounded';

interface IProps {
  columns?: number;
  changeTimeout?: number;
  items: JSX.Element[];
  className?: string;
  withArrows?: boolean;
  leftArrowClassName?: string;
  rightArrowClassName?: string;
  withNavigation?: boolean;
  navigationClassName?: string;
  navigationSelectedClassName?: string;
  navigationNotSelectedClassName?: string;
}

const Carousel: React.FC<IProps> = ({
  columns = 1,
  withArrows = true,
  changeTimeout = 5000,
  className = '',
  items: propsItems,
  leftArrowClassName = '',
  rightArrowClassName = '',
  withNavigation = true,
  navigationClassName = '',
  navigationSelectedClassName = '',
  navigationNotSelectedClassName = '',
}) => {
  const items = propsItems.map((item, index) => ({ index, item }));
  const [visibleItemIndexes, setVisibleItemIndexes] = React.useState<number[]>(
    items.slice(0, columns).map((item) => item.index),
  );

  React.useEffect(() => {
    setVisibleItemIndexes(items.slice(0, columns).map((item) => item.index));
  }, [columns, propsItems]);

  const moveRight = () => {
    const lastVisibleIndex = visibleItemIndexes[visibleItemIndexes.length - 1];
    const [, ...visibleIndexes] = visibleItemIndexes;
    const newVisibleIndex = lastVisibleIndex + 1 < items.length ? lastVisibleIndex + 1 : 0;
    visibleIndexes.push(newVisibleIndex);
    setVisibleItemIndexes(visibleIndexes);
  };

  const moveLeft = () => {
    const visibleIndexes = visibleItemIndexes;
    const firstVisibleIndex = visibleIndexes[0];
    visibleIndexes.pop();
    const newVisibleIndex = firstVisibleIndex - 1 >= 0 ? firstVisibleIndex - 1 : items.length - 1;
    setVisibleItemIndexes([newVisibleIndex, ...visibleIndexes]);
  };

  const moveTo = (index: number) => {
    const newVisibleIndexes = [...items, ...items].slice(index, index + columns).map((item) => item.index);
    console.log(visibleItemIndexes, newVisibleIndexes);
    setVisibleItemIndexes(newVisibleIndexes);
  };

  useInterval(() => {
    moveRight();
  }, changeTimeout);

  return (
    // <div className={`${styles.wrapper} ${className}`}>
    <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1} className={styles.innerWrapper}>
      {items.map(
        (item) =>
          // <div key={item.index} className={`${styles.inner}`}>
          item.item,
        // </div>
      )}
    </Slider>
    // </div>
  );
};

export default Carousel;
