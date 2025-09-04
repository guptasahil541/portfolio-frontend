import React from 'react';
import classNames from 'classnames';

import styles from './AboutMe.module.css';

export const AboutMe = () => {
    return (
        <section
            id="about-me"
            className={classNames('container', styles.about_me_container)}
        >
            <div className={styles.section_header}>
                <h1 className={styles.section_heading}>
                    Developer. Designer. <br />A Storyteller in UI
                </h1>
                <h3 className={styles.section_sub_heading}>ABOUT ME</h3>
            </div>
            <div className={styles.section_content_container_outer}>
                <div className={styles.section_content_spacer}></div>
                <div className={styles.section_content_container_inner}>
                    <p className={styles.section_content}>
                        I’m a Full Stack Developer with 3.5 years of experience
                        working across frontend and backend technologies. Over
                        the years, I’ve built everything from sleek, interactive
                        UIs to robust, scalable applications.
                    </p>
                    <p className={styles.section_content}>
                        I enjoy bridging creativity and engineering to create
                        digital products that are both visually engaging and
                        technically sound.
                    </p>
                </div>
            </div>
        </section>
    );
};
