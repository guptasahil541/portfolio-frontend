import React from 'react';
import classNames from 'classnames';

import { SectionHeadingProps } from './types';

import styles from './SectionHeading.module.css';

export const SectionHeading = ({
    className,
    children,
}: SectionHeadingProps) => {
    return (
        <h2 className={classNames(styles.section_heading, className)}>
            {children}
        </h2>
    );
};
