import { SectionHeadingProps } from './types'

import React from 'react'

import styles from './SectionHeading.module.css'

export const SectionHeading: React.FC<SectionHeadingProps> = (props) => {
  return (
    <h2 className={styles.section_heading}>{props.content}</h2>
  )
}
