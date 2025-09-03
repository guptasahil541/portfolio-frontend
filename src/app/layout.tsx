import { ReactLenis } from '@/utility/lenis';

import type { Metadata } from 'next';

import { hostGrotesk, neueMontreal } from '@/fonts/fonts';

import '@/styles/globals.css';
import 'lenis/dist/lenis.css';

export const metadata: Metadata = {
    title: 'Sahil Gupta - UI Designer and Developer',
    description:
        'I bridge design and development to create digital experiences that stand out.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${neueMontreal.variable} ${hostGrotesk.variable}`}
        >
            <ReactLenis root>
                <body>{children}</body>
            </ReactLenis>
        </html>
    );
}
