import React from 'react'

import { SectionTextContentProps } from './types'

import styles from '@/styles/components/ui/SectionTextContent/SectionTextContent.module.css'

export const SectionTextContent: React.FC<SectionTextContentProps> = (props) => {
  return (
    <p className={styles.section_text_content}>{props.content}</p>
  )
}
