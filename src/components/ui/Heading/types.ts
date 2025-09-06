import { cva, VariantProps } from 'class-variance-authority';

import { HTMLAttributes, Ref } from 'react';

import styles from './Heading.module.css';

export const headingVariants = cva('', {
    variants: {
        size: {
            xs: styles.heading_extra_small,
            lg: styles.heading_large,
            xl: styles.heading_extra_large,
        },
    },
    defaultVariants: {
        size: 'lg',
    },
});

export type HeadingVariants = VariantProps<typeof headingVariants>;

export interface HeadingProps
    extends HTMLAttributes<HTMLHeadingElement>,
        HeadingVariants {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    ref?: Ref<HTMLHeadingElement>;
}
