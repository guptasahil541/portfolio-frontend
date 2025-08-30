import { Projects, Story, Services, SocialPosts } from '@/components';

export default function page() {
    return (
        <>
            <main className="main_flex">
                <Projects />
                <Story />
                <Services />
                <SocialPosts />
            </main>
        </>
    );
}
