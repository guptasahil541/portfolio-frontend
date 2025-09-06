import React from 'react';
import classNames from 'classnames';

import { HeadingProps, headingVariants } from './types';

export const Heading: React.FC<HeadingProps> = ({
    as: Tag = 'h1',
    className,
    size,
    ...props
}) => {
    return (
        <Tag
            className={classNames(className, headingVariants({ size }))}
            {...props}
        />
    );
};
