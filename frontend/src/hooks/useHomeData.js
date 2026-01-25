import { useState, useEffect } from 'react';
import { getProjects } from '../api/projectApi';
import { getStats } from '../api/statApi';
import { getTestimonials } from '../api/testimonialApi';
import { getEvents } from '../api/eventApi';

export const useHomeData = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [stats, setStats] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [flagshipEvents, setFlagshipEvents] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Parallel fetching for better performance
                const [projectsRes, statsRes, testimonialsRes, eventsRes] = await Promise.allSettled([
                    getProjects(),
                    getStats(),
                    getTestimonials(),
                    getEvents()
                ]);

                // Handle Projects
                if (projectsRes.status === 'fulfilled') {
                    setFeaturedProjects(projectsRes.value.data.filter(p => p.featured).slice(0, 3));
                } else {
                    console.error("Failed to fetch projects:", projectsRes.reason);
                }

                // Handle Stats
                if (statsRes.status === 'fulfilled') {
                    setStats(statsRes.value.data);
                } else {
                    console.error("Failed to fetch stats:", statsRes.reason);
                }

                // Handle Testimonials
                if (testimonialsRes.status === 'fulfilled') {
                    setTestimonials(testimonialsRes.value.data);
                } else {
                    console.error("Failed to fetch testimonials:", testimonialsRes.reason);
                }

                // Handle Events
                if (eventsRes.status === 'fulfilled') {
                    setFlagshipEvents(eventsRes.value.data.filter(e => e.flagship).slice(0, 3));
                } else {
                    console.error("Failed to fetch events:", eventsRes.reason);
                }

            } catch (err) {
                console.error("Unexpected error in useHomeData:", err);
                setError("Failed to load some content");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { featuredProjects, stats, testimonials, flagshipEvents, error, loading };
};
