import React from 'react';

import { SectionHeadingProps } from './types';

import styles from '@/styles/components/ui/SectionHeading/SectionHeading.module.css';

export const SectionHeading: React.FC<SectionHeadingProps> = (props) => {
    return <h2 className={styles.section_heading}>{props.content}</h2>;
};
