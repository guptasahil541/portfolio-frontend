import React from 'react';

import { SectionHeader, SectionTextContent } from '@/components/ui';

export const Story = () => {
    return (
        <section id="story">
            <div className="section_flex container">
                <SectionHeader
                    heading="Not just a developer, a storyteller in UI"
                    subHeading="( story )"
                />
                <SectionTextContent content="I'm a Full Stack Developer with 3.5 years of experience working across frontend and backend technologies. Over the years, I've built everything from sleek, interactive UIs to robust, scalable applications. I enjoy bridging creativity and engineering to create digital products that are both visually engaging and technically sound." />
            </div>
        </section>
    );
};
