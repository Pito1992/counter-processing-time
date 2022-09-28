import React from 'react';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface IContainerProps extends React.ComponentPropsWithoutRef<"div"> {}

function ContainerComp({ className, children, ...restProps }: IContainerProps): JSX.Element {
  return (
    <div className={classNames(styles.container, className)} {...restProps}>
      {children}
    </div>
  );
}

export default ContainerComp;