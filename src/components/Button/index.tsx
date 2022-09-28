import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  primary?: boolean,
}

function ButtonComp({
  children,
  className,
  type = "button",
  primary,
  ...restProps
}: IButtonProps): JSX.Element {
  return (
    <button className={classNames(
      styles.button,
      { [styles.primary]: primary },
      className
    )} type={type} {...restProps}>
      {children}
    </button>
  )
}

export default ButtonComp