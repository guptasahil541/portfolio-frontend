import React from 'react';
import classNames from 'classnames';

import { SectionHeading, SectionSubHeading } from '@/components/ui';

import styles from './AboutMe.module.css';

export const AboutMe = () => {
    return (
        <section
            id="about-me"
            className={classNames('container', styles.about_me_container)}
        >
            <div className={styles.section_header}>
                <SectionHeading>
                    Developer. Designer. <br />A Storyteller in UI
                </SectionHeading>
                <SectionSubHeading>ABOUT ME</SectionSubHeading>
            </div>
            <div className={styles.text_container_outer}>
                <div aria-hidden></div>
                <div className={styles.text_container_inner}>
                    <p>
                        I’m a Full Stack Developer with 3.5 years of experience
                        working across frontend and backend technologies. Over
                        the years, I’ve built everything from sleek, interactive
                        UIs to robust, scalable applications.
                    </p>
                    <p>
                        I enjoy bridging creativity and engineering to create
                        digital products that are both visually engaging and
                        technically sound.
                    </p>
                </div>
            </div>
        </section>
    );
};
