import localFont from 'next/font/local';

export const clashDisplay = localFont({
    src: "./clashDisplay/ClashDisplay-Semibold.woff2",
    variable: "--font-clash-display"
});

export const thicccboi = localFont({
    src: [
        {
            path: './thicccboi/THICCCBOI-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: './thicccboi/THICCCBOI-SemiBold.woff2',
            weight: '600',
            style: 'normal',
        }
    ],
    variable: "--font-thicccboi"
})