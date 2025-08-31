import React from 'react';

import { FluidGradientBackground, Noise } from '@/components/ui';

import styles from '@/styles/components/sections/Hero/Hero.module.css';

export const Hero = () => {
    return (
        <section id="hero" className={styles.hero_container}>
            <FluidGradientBackground />
            <Noise />
        </section>
    );
};
