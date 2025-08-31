'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from '@/components/utility/gsap';

import { SectionSubHeadingProps } from './types';

import styles from '@/styles/components/ui/SectionSubHeading/SectionSubHeading.module.css';

export const SectionSubHeading: React.FC<SectionSubHeadingProps> = (props) => {
    const subHeadingRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        document.fonts.ready.then(() => {
            SplitText.create(subHeadingRef.current, {
                type: 'lines',
                mask: 'lines',
                autoSplit: true,
                onSplit: (self) => {
                    return gsap.from(self.lines, {
                        yPercent: 100,
                        autoAlpha: 0,
                        scrollTrigger: {
                            trigger: subHeadingRef.current,
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
        <h3 ref={subHeadingRef} className={styles.section_sub_heading}>
            {props.content}
        </h3>
    );
};
