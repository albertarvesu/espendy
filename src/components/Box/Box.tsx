import * as React from 'react';
import { Link } from 'react-router-dom';
import * as cx from 'classnames';

import './Box.css';

interface BoxProps {
  type: string;
  clazz: string;
  title?: string;
  path?: string;
  children?: React.ReactElement<any>;
}

const Box = ({ path, type, clazz, children, ...props }: BoxProps) => {
  if (path) {
    return (
      <Link
        {...props}
        className={cx('box', clazz, { [`box-${type}`]: !!type })}
        to={`/home${path}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <div className={cx('box', clazz, { [`box-${type}`]: !!type })}>
      {children}
    </div>
  );
};

export default Box;