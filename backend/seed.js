import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './src/models/Project.js';
import Resource from './src/models/Resource.js';
import GalleryItem from './src/models/GalleryItem.js';
import Event from './src/models/Event.js';
import Testimonial from './src/models/Testimonial.js';
import Stat from './src/models/Stat.js';
import AboutItem from './src/models/AboutItem.js';
import Developer from './src/models/Developer.js';
import connectDB from './src/config/db.js';

dotenv.config();

// ==============================================
//               HOME PAGE DATA
// ==============================================

const statsData = [
    { value: "100+", label: "Active Members" },
    { value: "10+", label: "Projects Built" },
    { value: "50+", label: "Workshops Hosted" }
];

const testimonialsData = [
    { text: "Robonity changed the way I learn robotics. The community is incredibly supportive!", author: "Vivek Kumar", role: "Member" },
    { text: "Finding collaborators for my drone project was effortless here.", author: "Durgesh Kumar", role: "Engineer" }
];

// Note: Featured Projects are determined by 'featured: true' in PROJECTS section below
// Note: Flagship Events are determined by 'flagship: true' in EVENTS section below


// ==============================================
//              PROJECTS PAGE DATA
// ==============================================

const projectsData = [
    {
        id: 1,
        title: "A-Bot",
        desc: "An autonomous raspberry-pi rover capable of mapping its environment.",
        category: "Robotics",
        status: "Completed",
        author: "DevTeam Alpha",
        color: "linear-gradient(135deg, #FF6B6B 0%, #556270 100%)",
        featured: true
    },
    {
        id: 2,
        title: "Swarm Control",
        desc: "Coordinated multi-agent system for search and rescue operations.",
        category: "AI",
        status: "In Progress",
        author: "Sarah J.",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        featured: true
    },
    {
        id: 3,
        title: "Smart Arm",
        desc: "Voice-controlled robotic arm assistance for home automation.",
        category: "IoT",
        status: "Beta",
        author: "TechWiz",
        color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        featured: true
    },
    {
        id: 4,
        title: "Neural Vision",
        desc: "Computer vision pipeline for object detection in low light.",
        category: "Software",
        status: "Completed",
        author: "Visionary",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        featured: false
    },
    {
        id: 5,
        title: "Underwater Drone",
        desc: "Submersible exploration vehicle for pipeline inspection.",
        category: "Robotics",
        status: "Planning",
        author: "DeepDive",
        color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        featured: false
    },
    {
        id: 6,
        title: "Home Brain",
        desc: "Centralized home automation server with local LLM integration.",
        category: "IoT",
        status: "In Progress",
        author: "NetRunner",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        featured: false
    },
];


// ==============================================
//               EVENTS PAGE DATA
// ==============================================

const eventsData = [
    {
        date: "2026-03-15",
        title: "Robonity Hackathon 2026",
        location: "San Francisco, CA & Online",
        description: "48 hours of non-stop coding, building, and innovating with peers from around the globe.",
        fullDetails: "Join us for the biggest robotics hackathon of the year! Categories include Autonomous Systems, AI Integration, and Sustainable Robotics. Prizes worth $50k.",
        registrationLink: "/register/hackathon",
        flagship: true
    },
    {
        date: "2026-04-10",
        title: "Workshop: Advanced Drone Flight",
        location: "Virtual",
        description: "Master the art of autonomous drone navigation using ROS2 and PX4.",
        fullDetails: "This hands-on workshop covers sensor fusion, path planning, and obstacle avoidance. Prerequisites: Basic Python and Linux knowledge.",
        registrationLink: "/register/drone-workshop",
        flagship: false
    },
    {
        date: "2026-05-22",
        title: "Global Tech Summit",
        location: "London, UK",
        description: "Hear from industry pioneers and robotics experts about the future of automation.",
        fullDetails: "Keynote speakers from Boston Dynamics, Tesla, and NASA. Networking sessions included.",
        registrationLink: "/register/tech-summit",
        flagship: true
    },
    {
        date: "2026-06-18",
        title: "Bot Wars Championship",
        location: "Tokyo, Japan",
        description: "The ultimate combat robotics tournament. Build, fight, and win glory.",
        fullDetails: "Witness 250lb combat robots clash in the arena. Team registration open now.",
        registrationLink: "/register/bot-wars",
        flagship: true
    }
];


// ==============================================
//              RESOURCES PAGE DATA
// ==============================================

const resourcesData = [
    { id: 1, title: 'React Documentation', description: 'Official React docs for building UIs.', category: 'Documentation', url: 'https://react.dev/', icon: '⚛️' },
    { id: 2, title: 'Arduino Hub', description: 'Tutorials and software for microcontrollers.', category: 'Hardware', url: 'https://www.arduino.cc/', icon: '♾️' },
    { id: 3, title: 'ROS Wiki', description: 'The Robot Operating System documentation.', category: 'Robotics', url: 'http://wiki.ros.org/', icon: '🤖' },
    { id: 4, title: 'Thingiverse', description: '3D models for printing robot parts.', category: '3D Printing', url: 'https://www.thingiverse.com/', icon: '🧊' },
    { id: 5, title: 'OpenCV', description: 'Computer vision library documentation.', category: 'AI/ML', url: 'https://opencv.org/', icon: '👁️' },
    { id: 6, title: 'Raspberry Pi', description: 'Projects and docs for the tiny computer.', category: 'Hardware', url: 'https://www.raspberrypi.org/', icon: '🥧' },
    { id: 7, title: 'TensorFlow', description: 'End-to-end open source machine learning platform.', category: 'AI/ML', url: 'https://www.tensorflow.org/', icon: '🧠' },
    { id: 8, title: 'GrabCAD', description: 'Community library of CAD models.', category: '3D Printing', url: 'https://grabcad.com/', icon: '⚙️' },
    { id: 9, title: 'Stack Overflow', description: 'Community for developer Q&A.', category: 'Community', url: 'https://stackoverflow.com/', icon: '💻' },
    { id: 10, title: 'MDN Web Docs', description: 'Resources for developers, by developers.', category: 'Documentation', url: 'https://developer.mozilla.org/', icon: '🌐' },
    { id: 11, title: 'NVIDIA Isaac', description: 'Platform for simulation and robot training.', category: 'Robotics', url: 'https://developer.nvidia.com/isaac-sim', icon: '🎮' },
    { id: 12, title: 'PyTorch', description: 'Deep learning framework.', category: 'AI/ML', url: 'https://pytorch.org/', icon: '🔥' },
    { id: 13, title: 'Unity 3D', description: 'Real-time 3D development platform.', category: 'Software', url: 'https://unity.com/', icon: '🎮' },
    { id: 14, title: 'Blender', description: 'Open source 3D creation suite.', category: '3D Printing', url: 'https://www.blender.org/', icon: '🟧' },
    { id: 15, title: 'VS Code', description: 'Code editing. Redefined.', category: 'Tools', url: 'https://code.visualstudio.com/', icon: '📝' },
    { id: 16, title: 'GitHub', description: 'Where the world builds software.', category: 'Community', url: 'https://github.com/', icon: '🐙' },
];


// ==============================================
//               GALLERY PAGE DATA
// ==============================================

const galleryData = [
    { id: 1, title: 'Autonomous Rover', description: 'A student-built rover navigating an obstacle course.', category: 'Robotics', color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)' },
    { id: 2, title: 'RoboSoccer 2025', description: 'Our team competing in the finals.', category: 'AI', color: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)' },
    { id: 3, title: '3D Printed Arm', description: 'A 6-axis robotic arm prototype.', category: 'Mechanical', color: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)' },
    { id: 4, title: 'Workshop Day', description: 'Members learning soldering and circuitry.', category: 'Robotics', color: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)' },
    { id: 5, title: 'Autonomous Drone', description: 'Quad-copter with obstacle avoidance.', category: 'Robotics', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { id: 6, title: 'AI Chess Bot', description: 'Computer vision based chess engine.', category: 'AI', color: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' },
    { id: 7, title: 'Line Follower', description: 'High speed line following robot.', category: 'Robotics', color: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)' },
    { id: 8, title: 'Guest Lecture', description: 'Industry expert talk on Future of AI.', category: 'Events', color: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' },
    { id: 9, title: 'Smart Wearable', description: 'Health monitoring wristband prototype.', category: 'IoT', color: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)' },
    { id: 10, title: 'Home Automation', description: 'Voice controlled lights and fans.', category: 'IoT', color: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)' },
    { id: 11, title: 'Solar Tracker', description: 'Dual-axis solar panel tracking system.', category: 'Mechanical', color: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)' },
    { id: 12, title: 'Maze Solver', description: 'Micromouse robot solving a maze.', category: 'Robotics', color: 'linear-gradient(to top, #5ee7df 0%, #b490ca 100%)' },
    { id: 13, title: 'Face Recognition', description: 'Attendance system using OpenCV.', category: 'AI', color: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)' },
    { id: 14, title: 'Hexapod', description: 'Six-legged spider robot.', category: 'Robotics', color: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)' },
    { id: 15, title: 'Tech Expo', description: 'Annual showcase of student projects.', category: 'Events', color: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' },
];


// ==============================================
//                ABOUT PAGE DATA
// ==============================================

const aboutItemsData = [
    {
        title: "Our Mission",
        text: "To empower students and engineers to design, build, and share impactful robotics projects.",
        icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>'
    },
    {
        title: "Our Vision",
        text: "A collaborative ecosystem where innovation, learning, and creativity drive the future of robotics.",
        icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>'
    },
    {
        title: "Community First",
        text: "Robonity is powered by its community — makers, coders, and problem solvers growing together.",
        icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>'
    },
    {
        title: "Open Innovation",
        text: "We believe in open-source knowledge sharing to accelerate technological breakthroughs for everyone.",
        icon: '<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" /></svg>'
    }
];

const developersData = [
    { name: "Aman Choudhary", role: "Full Stack Developer", image: "https://ui-avatars.com/api/?name=Aman+Choudhary&background=0d8abc&color=fff", desc: "Passionate about building scalable web applications and exploring new tech stacks.", socials: { instagram: "#", linkedin: "#", github: "#" } },
    { name: "Anirban Das", role: "Frontend Developer", image: "https://ui-avatars.com/api/?name=Anirban+Das&background=0d8abc&color=fff", desc: "Crafting beautiful and intuitive user interfaces with a focus on user experience.", socials: { instagram: "#", linkedin: "#", github: "#" } },
    { name: "Shashank Savarkar", role: "Backend Developer", image: "https://ui-avatars.com/api/?name=Shashank+Savarkar&background=0d8abc&color=fff", desc: "Architecting robust server-side solutions and optimizing database performance.", socials: { instagram: "#", linkedin: "#", github: "#" } }
];


// ==============================================
//               SEEDING FUNCTION
// ==============================================

const seedData = async () => {
    try {
        await connectDB();

        console.log('Clearing existing data...');
        await Promise.all([
            Project.deleteMany({}),
            Resource.deleteMany({}),
            GalleryItem.deleteMany({}),
            Event.deleteMany({}),
            Testimonial.deleteMany({}),
            Stat.deleteMany({}),
            AboutItem.deleteMany({}),
            Developer.deleteMany({})
        ]);

        console.log('Seeding Home Page Data (Stats, Testimonials)...');
        await Promise.all([
            Stat.insertMany(statsData),
            Testimonial.insertMany(testimonialsData)
        ]);

        console.log('Seeding Projects Page Data...');
        await Project.insertMany(projectsData);

        console.log('Seeding Events Page Data...');
        await Event.insertMany(eventsData);

        console.log('Seeding Resources Page Data...');
        await Resource.insertMany(resourcesData);

        console.log('Seeding Gallery Page Data...');
        await GalleryItem.insertMany(galleryData);

        console.log('Seeding About Page Data (Items, Developers)...');
        await Promise.all([
            AboutItem.insertMany(aboutItemsData),
            Developer.insertMany(developersData)
        ]);

        console.log('==============================================');
        console.log('       ALL DATA SEEDED SUCCESSFULLY');
        console.log('==============================================');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
