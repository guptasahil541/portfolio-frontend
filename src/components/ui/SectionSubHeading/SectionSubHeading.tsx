import { SectionSubHeadingProps } from './types'

import React from 'react'

import styles from './SectionSubHeading.module.css'

export const SectionSubHeading: React.FC<SectionSubHeadingProps> = (props) => {
  return (
    <h3 className={styles.section_sub_heading}>{props.content}</h3>
  )
}
