import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Contact from '../components/sections/Contact';
import { portfolioService } from '../services';
import Loading from '../components/Loading';

const Home = () => {
    const [data, setData] = useState({
        about: null,
        skills: [],
        projects: [],
        experiences: [],
        education: [],
        languages: [],
        interests: []
    });
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchAllData = async (signal) => {
            const fetchErrors = [];

            try {
                // Use Promise.allSettled to allow partial success
                // Pass signal to support cancellation
                const results = await Promise.allSettled([
                    portfolioService.getAbout({ signal }),
                    portfolioService.getSkills({ signal }),
                    portfolioService.getProjects({ signal }),
                    portfolioService.getExperiences({ signal }),
                    portfolioService.getEducation({ signal }),
                    portfolioService.getLanguages({ signal }),
                    portfolioService.getInterests({ signal })
                ]);

                // If canceled, abort processing to avoid state updates on unmounted component
                if (signal.aborted) return;

                // Helper to extract data safely
                const getResult = (index, fallback, name) => {
                    const result = results[index];
                    if (result.status === 'fulfilled') {
                        return result.value.data;
                    }

                    const error = result.reason;
                    // Ignore cancellation errors
                    if (axios.isCancel(error)) return fallback;

                    // Log specific error for debugging
                    console.error(`[Home] Error fetching ${name}:`, error?.userMessage || error?.message || 'Unknown error');
                    fetchErrors.push({ name, error: error?.userMessage || error?.message });
                    return fallback;
                };

                // Map results to state
                setData({
                    about: getResult(0, null, 'about'),
                    skills: getResult(1, [], 'skills'),
                    projects: getResult(2, [], 'projects'),
                    experiences: getResult(3, [], 'experiences'),
                    education: getResult(4, [], 'education'),
                    languages: getResult(5, [], 'languages'),
                    interests: getResult(6, [], 'interests')
                });

                if (fetchErrors.length > 0) {
                    setErrors(fetchErrors);
                    // Warn but don't crash - partial data is better than none
                    console.warn('[Home] Loaded with partial errors:', fetchErrors);
                }

            } catch (error) {
                // Ignore cancellation
                if (axios.isCancel(error) || signal.aborted) return;

                // Catastrophic failure (e.g. logic error in processing results)
                console.error('[Home] Critical error in fetchAllData:', error);
            } finally {
                if (!signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchAllData(controller.signal);

        return () => controller.abort();
    }, []);

    if (loading) {
        return <Loading fullScreen={true} />;
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <main>
                <Hero about={data.about} loading={loading} />
                <About about={data.about} loading={loading} />
                <Skills skills={data.skills} loading={loading} />
                <Projects projects={data.projects} loading={loading} />
                <Experience
                    experiences={data.experiences}
                    education={data.education}
                    loading={loading}
                />
                <Contact about={data.about} />
            </main>
            <Footer about={data.about} languages={data.languages} interests={data.interests} />
        </div>
    );
};

export default Home;
