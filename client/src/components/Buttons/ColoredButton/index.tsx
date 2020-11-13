import React from 'react';
import Text from 'src/components/Text';

import styles from './styles.module.scss';
import { TextProps } from 'src/components/Text';

interface IProps {
  text: string;
  variant?: 'red' | 'gray';
  onClick: () => void;
  classes?: {
    root?: string;
    text?: TextProps;
  };
}

const ColoredButton: React.FC<IProps> = ({ text, onClick, variant = 'red', classes }) => {
  const getColorClass = () => {
    const options = {
      red: styles.red,
      gray: styles.gray,
    };
    return options[variant];
  };

  return (
    <div className={`${styles.root} ${getColorClass()} ${classes?.root || ''}`} onClick={onClick}>
      <Text
        textTransform={classes?.text?.textTransform || 'uppercase'}
        fontSize={classes?.text?.fontSize || '1rem'}
        fontWeight={classes?.text?.fontWeight || 750}
      >
        {text}
      </Text>
    </div>
  );
};

export default ColoredButton;
