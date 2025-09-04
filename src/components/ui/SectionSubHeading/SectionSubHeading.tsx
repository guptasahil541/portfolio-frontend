import React from 'react';
import classNames from 'classnames';

import { SectionSubHeadingProps } from './types';

import styles from './SectionSubHeading.module.css';

export const SectionSubHeading = ({
    className,
    children,
}: SectionSubHeadingProps) => {
    return (
        <h3 className={classNames(styles.section_sub_heading, className)}>
            {children}
        </h3>
    );
};
