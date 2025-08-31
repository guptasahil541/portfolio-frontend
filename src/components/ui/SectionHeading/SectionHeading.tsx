'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from '@/components/utility/gsap';

import { SectionHeadingProps } from './types';

import styles from '@/styles/components/ui/SectionHeading/SectionHeading.module.css';

export const SectionHeading: React.FC<SectionHeadingProps> = (props) => {
    const headingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        document.fonts.ready.then(() => {
            SplitText.create(headingRef.current, {
                type: 'words',
                mask: 'words',
                autoSplit: true,
                onSplit: (self) => {
                    return gsap.from(self.words, {
                        yPercent: 100,
                        autoAlpha: 0,
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: 'top bottom',
                            end: 'bottom 50%',
                            scrub: true,
                        },
                        stagger: 0.25,
                    });
                },
            });
        });
    }, []);

    return (
        <h2 ref={headingRef} className={styles.section_heading}>
            {props.content}
        </h2>
    );
};
