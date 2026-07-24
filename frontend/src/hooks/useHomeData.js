import { useMemo } from 'react';
import { projectsData } from '../data/projects';
import { statsData } from '../data/stats';
import { testimonialsData } from '../data/testimonials';

export const useHomeData = () => {
    const featuredProjects = useMemo(() => projectsData.filter(p => p.featured).slice(0, 3), []);

    return { featuredProjects, stats: statsData, testimonials: testimonialsData, error: null, loading: false };
};
