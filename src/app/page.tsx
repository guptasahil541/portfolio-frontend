import { AboutMe } from '@/components';

import styles from './page.module.css';

export default function page() {
    return (
        <main className={styles.main}>
            <AboutMe />
        </main>
    );
}
