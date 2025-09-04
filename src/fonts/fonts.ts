import { Host_Grotesk } from 'next/font/google';
import localFont from 'next/font/local';

export const hostGrotesk = Host_Grotesk({
    weight: ['400', '500', '600'],
    variable: '--font-host-grotesk',
});

export const neueMontreal = localFont({
    src: [
        {
            path: './neueMontreal/PPNeueMontreal-Book.otf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-neue-montreal',
});
