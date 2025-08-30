import React from 'react'

import { SectionSubHeadingProps } from './types'

import styles from '@/styles/components/ui/SectionSubHeading/SectionSubHeading.module.css'

export const SectionSubHeading: React.FC<SectionSubHeadingProps> = (props) => {
  return (
    <h3 className={styles.section_sub_heading}>{props.content}</h3>
  )
}
