import React from 'react'

import { SectionHeaderProps } from './types'

import { SectionHeading, SectionSubHeading } from '@/components/ui'

import styles from '@/styles/components/ui/SectionHeader/SectionHeader.module.css';

export const SectionHeader: React.FC<SectionHeaderProps> = (props) => {
  return (
    <div className={styles.section_header}>
        <SectionSubHeading content={props.subHeading} />
        <SectionHeading content={props.heading} />
    </div>
  )
}
