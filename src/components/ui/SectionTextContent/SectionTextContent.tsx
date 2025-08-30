import { SectionTextContentProps } from './types'

import React from 'react'

import styles from './SectionTextContent.module.css'

export const SectionTextContent: React.FC<SectionTextContentProps> = (props) => {
  return (
    <p className={styles.section_text_content}>{props.content}</p>
  )
}
