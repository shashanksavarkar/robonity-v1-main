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
        title: "AUTO-BOT: Hybrid-Powered Autonomous Unmanned Ground Vehicle (UGV)",
        desc: "AUTO-BOT is a hybrid diesel-electric autonomous Unmanned Ground Vehicle designed to efficiently transport medium payloads up to 50 kg.",
        category: "Robotics / Autonomous Systems / Hybrid Electric Vehicles (UGV)",
        status: "Ongoing",
        author: "Aman Choudhary & Team",
        color: "linear-gradient(135deg, #FF6B6B 0%, #556270 100%)",
        image: "/projects/auto-bot.png",
        featured: true,
    },
    {
        id: 2,
        title: "SWARM-X: Intelligent Multi-Agent Swarm Control System",
        desc: "SWARM-X is an AI-driven multi-agent swarm control system designed for coordinated search and rescue operations with autonomous navigation and real-time collaboration.",
        category: "Artificial Intelligence / Robotics / Multi-Agent Systems",
        status: "Ongoing",
        author: "Aman Choudhary & Team",
        color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        image: "/projects/swarm.png",
        featured: true,
    },
    {
        id: 3,
        title: "ARES-ROVER: Autonomous Exploration Rover",
        desc: "ARES-ROVER is an autonomous planetary exploration rover designed for Mars terrain analysis, obstacle navigation, and remote scientific data collection in extreme environments.",
        category: "Robotics / Space Exploration / Autonomous Systems",
        status: "Concept",
        author: "Anirban Das, Aman Choudhary & Team",
        color: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)",
        image: "/projects/rover.png",
        featured: true
    },
    {
        id: 4,
        title: "Project Black Tiger – Autonomous Spy Bot",
        desc: "Project Black Tiger is an autonomous reconnaissance robot featuring a computer vision pipeline optimized for object detection, tracking, and situational awareness in low-light and covert environments.",
        category: "Computer Vision / Robotics / Autonomous Surveillance",
        status: "Completed",
        author: "Pranjal Chaturvedi, Arunodaya Sharma & Lehar Gupta",
        color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        image: "/projects/spy-bot.png",
        featured: false,

    },
    {
        id: 5,
        title: "Automatic Plant Watering Hydropaunic System",
        desc: "An autonomous plant watering system designed to monitor soil moisture levels and water plants based on real-time data.",
        category: "Robotics / IoT / Agricultural Automation",
        status: "Planning",
        author: "Manish Meena",
        color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        image: "/projects/auto-watering.png",
        featured: false
    },
    {
        id: 6,
        title: "Obstacle Detecting Bot",
        desc: "An autonomous obstacle detecting robot designed to navigate through challenging terrains using advanced computer vision and machine learning.",
        category: "Robotics / Computer Vision / Autonomous Navigation",
        status: "In Progress",
        author: "Archit Singh Chauhan, Aditya Raj & Divyansh Soni",
        color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        image: "/projects/auto-obstacle.png",
        featured: false
    },
];


// ==============================================
//               EVENTS PAGE DATA
// ==============================================

const eventsData = [
    // --- AY 2025-26 (Current) ---
    {
        date: "2025-09-15",
        title: "CAD Workshop",
        location: "GSV Lab",
        description: "A hands-on session on 3D modeling and mechanical design for robotics.",
        fullDetails: "Learn industry-standard tools like Fusion 360 and OnShape to design custom robot parts.",
        registrationLink: "",
        flagship: false
    },
    {
        date: "2025-10-31",
        title: "Freshers Workshop",
        location: "Auditorium",
        description: "An introductory event to welcome new members and showcase the club's vision.",
        fullDetails: "Meet the team, see our past projects, and learn how you can start your journey in robotics.",
        registrationLink: "",
        flagship: false
    },
    {
        date: "2026-01-12",
        title: "RoboSoccer 1st Edition",
        location: "Main Arena",
        description: "A high-energy competition where autonomous and manual bots battle it out on the pitch.",
        fullDetails: "Build your own soccer-playing robot and compete for the championship trophy.",
        image: "/events/robowars.png",
        registrationLink: "/register/robosoccer",
        flagship: true
    },
    {
        date: "2026-02-05",
        title: "Getting Started with Robotics (GSR)",
        location: "Seminar Hall 1",
        description: "A foundational bootcamp covering sensors, microcontrollers, and basic programming.",
        fullDetails: "The perfect starting point for beginners. Hands-on with Arduino and basic electronics.",
        registrationLink: "",
        flagship: false
    },

    // --- AY 2024-25 (Past) ---
    {
        date: "2024-10-25",
        title: "Freshers Workshop (2024)",
        location: "Auditorium",
        description: "The inaugural welcome event for the 2024 batch focusing on basic electronics.",
        fullDetails: "Flashback to where it all started for the 2024 cohort.",
        registrationLink: "",
        flagship: false
    },
    {
        date: "2025-03-10",
        title: "RoboWars 1st Edition",
        location: "Open Ground",
        description: "Robonity's flagship combat robotics tournament featuring heavy-metal destruction.",
        fullDetails: "Sparks flew and metal crunched in our first-ever heavy combat event.",
        image: "/events/robowars.png",
        registrationLink: "",
        flagship: true
    },

    // --- Upcoming / Flagship (Restored) ---
    {
        date: "2026-03-15",
        title: "RoboWars 2.0",
        location: "GSV",
        description: "High-intensity robotics combat competition where custom-built machines battle head-to-head.",
        fullDetails: "Join us for the biggest robotics hackathon of the year! Categories include Autonomous Systems, AI Integration, and Sustainable Robotics. Prizes worth $50k.",
        image: "/events/robowars.png",
        registrationLink: "https://robowars-gsv.vercel.app/",
        flagship: true
    },
    {
        date: "2026-03-20",
        title: "RoboBlocks",
        location: "GSV",
        description: "Master the art of autonomous bots navigation using ROS2 and PX4.",
        fullDetails: "This hands-on workshop covers sensor fusion, path planning, and obstacle avoidance. Prerequisites: Basic Python and Linux knowledge.",
        image: "/events/roboblocks.png",
        registrationLink: "https://roboblocks-gsv.vercel.app/",
        flagship: true
    },
    {
        date: "2026-01-25",
        title: "Choke with Coke",
        location: "GSV",
        description: "A fun-filled event where participants can showcase their skills in logical reasoning, problem-solving, code debugging, and robotics and automation.",
        fullDetails: "Keynote speakers from Boston Dynamics, Tesla, and NASA. Networking sessions included.",
        image: "/events/cwc.png",
        registrationLink: "/register/choke-with-coke",
        flagship: true
    },
    // {
    //     date: "2026-06-18",
    //     title: "Bot Wars Championship",
    //     location: "Tokyo, Japan",
    //     description: "The ultimate combat robotics tournament. Build, fight, and win glory.",
    //     fullDetails: "Witness 250lb combat robots clash in the arena. Team registration open now.",
    //     registrationLink: "/register/bot-wars",
    //     flagship: false
    // }
];


// ==============================================
//              RESOURCES PAGE DATA
// ==============================================


const resourcesData = [
    { id: 1, title: 'ESP32 Documentation', description: 'IoT + robotics microcontroller documentation.', category: 'Hardware', url: 'https://docs.espressif.com/projects/esp-idf/en/latest/esp32/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" /><path d="M20 9h3" /><path d="M20 14h3" /><path d="M1 9h3" /><path d="M1 14h3" /></svg>' },
    { id: 2, title: 'STM32 Documentation', description: 'Industrial-grade MCU documentation and references.', category: 'Hardware', url: 'https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 1v3" /><path d="M15 1v3" /><path d="M9 20v3" /><path d="M15 20v3" /><path d="M20 9h3" /><path d="M20 14h3" /><path d="M1 9h3" /><path d="M1 14h3" /></svg>' },
    { id: 3, title: 'PlatformIO', description: 'Professional embedded development environment for robotics.', category: 'Software', url: 'https://platformio.org/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>' },
    { id: 4, title: 'FreeRTOS', description: 'Real-time operating system for microcontrollers and robotics.', category: 'Embedded', url: 'https://www.freertos.org/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /></svg>' },
    { id: 5, title: 'Adafruit Learning System', description: 'Practical electronics tutorials for builders.', category: 'Hardware', url: 'https://learn.adafruit.com/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c0 4-4 8-4 8H4c0-4 4-8 4-8s-2 6-4 6" /><path d="M12 2c0 4 4 8 4 8h4c0-4-4-8-4-8s2 6 4 6" /><rect x="8" y="12" width="8" height="10" rx="3" /></svg>' },
    { id: 6, title: 'Gazebo Simulator', description: 'Robot physics simulation platform (ROS-native).', category: 'Simulation', url: 'https://gazebosim.org/home', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>' },
    { id: 7, title: 'Webots', description: 'Open-source robot simulator for professional use.', category: 'Simulation', url: 'https://cyberbotics.com/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>' },
    { id: 8, title: 'CoppeliaSim', description: 'Advanced robot simulation with multiple physics engines.', category: 'Simulation', url: 'https://www.coppeliarobotics.com/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>' },
    { id: 9, title: 'MATLAB Simulink', description: 'Control systems modeling and simulation.', category: 'Simulation', url: 'https://www.mathworks.com/products/simulink.html', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>' },
    { id: 10, title: 'OpenCV', description: 'Computer vision library for image processing.', category: 'AI/ML', url: 'https://opencv.org/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3Z" /></svg>' },
    { id: 11, title: 'MediaPipe', description: 'Real-time perception pipelines for vision tasks.', category: 'AI/ML', url: 'https://developers.google.com/mediapipe', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3Z" /></svg>' },
    { id: 12, title: 'DepthAI / Luxonis', description: 'Stereo and AI-powered vision hardware.', category: 'Hardware', url: 'https://docs.luxonis.com/software/depthai/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 1v3" /><path d="M15 1v3" /></svg>' },
    { id: 13, title: 'PID Control', description: 'MIT/MathWorks docs on control system accuracy.', category: 'Control', url: 'https://controlitu.it.dtu.dk/index.php/Introduction_to_PID_Control', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" /></svg>' },
    { id: 14, title: 'ROS Navigation (Nav2)', description: 'Standards for autonomous navigation in ROS2.', category: 'Software', url: 'https://navigation.ros.org/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>' },
    { id: 15, title: 'SLAM (GMapping/Cartographer)', description: 'Simultaneous Localization and Mapping for robots.', category: 'Software', url: 'https://github.com/ros-perception/slam_gmapping', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>' },
    { id: 16, title: 'Fusion 360', description: 'Mechanical design and CAM workflows for robotics.', category: 'CAD', url: 'https://www.autodesk.com/products/fusion-360/overview', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>' },
    { id: 17, title: 'Prusa Knowledge Base', description: '3D printing techniques for robot parts.', category: 'Manufacturing', url: 'https://help.prusa3d.com/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 9h6v6H9z" /><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" /></svg>' },
    { id: 18, title: 'CNC Cookbook', description: 'Guides for precision parts fabrication.', category: 'Manufacturing', url: 'https://www.cnccookbook.com/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 9h6v6H9z" /><path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" /></svg>' },
    { id: 19, title: 'ROS + AI (PyTorch)', description: 'Integrating deep learning with ROS2 systems.', category: 'AI/ML', url: 'https://pytorch.org/blog/ros-torch-integration/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3Z" /></svg>' },
    { id: 20, title: 'NVIDIA Isaac ROS', description: 'Hardware acceleration for robotics AI.', category: 'AI/ML', url: 'https://developer.nvidia.com/isaac-ros', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3Z" /></svg>' },
    { id: 21, title: 'YOLO (Ultralytics)', description: 'Real-time object detection for autonomous bots.', category: 'AI/ML', url: 'https://docs.ultralytics.com/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.6-3Z" /></svg>' },
    { id: 22, title: 'MIT OpenCourseWare', description: 'Authoritative robotics learning resources.', category: 'Learning', url: 'https://ocw.mit.edu/courses/robotics-curriculum/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>' },
    { id: 23, title: 'Stanford CS231n', description: 'Deep learning and vision learning materials.', category: 'Learning', url: 'http://cs231n.stanford.edu/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>' },
    { id: 24, title: 'ROS Discourse', description: 'Community discussions and troubleshooting.', category: 'Community', url: 'https://discourse.ros.org/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14h.6A8.5 8.5 0 0 1 21 11.5z" /></svg>' },
    { id: 25, title: 'IEEE RAS', description: 'Robotics research and automation publications.', category: 'Research', url: 'https://www.ieee-ras.org/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>' },
    { id: 26, title: 'GitHub Robotics Repos', description: 'Essential tools and version control for teams.', category: 'Tools', url: 'https://github.com/topics/robotics', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>' },
    { id: 27, title: 'Docker for Robotics', description: 'Containerization for consistent robot environments.', category: 'DevOps', url: 'https://www.docker.com/blog/how-to-use-the-official-ros-docker-images/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="2" y1="20" x2="22" y2="20" /></svg>' },
];



// ==============================================
//               GALLERY PAGE DATA
// ==============================================

const galleryData = [
    { id: 1, title: 'On Shape Workshop', description: 'TechnoCrats Organised a Workshop on On Shape.', category: 'WORKSHOP', color: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', image: '/gallery/IMG-20250906-WA0007.jpg' },
    { id: 2, title: 'RoboSoccer 2025', description: 'Our team competing in the finals.', category: 'INDUCTION', color: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)', image: '/gallery/IMG_20251117_183445 (1).jpg' },
    { id: 3, title: '3D Printed Arm', description: 'A 6-axis robotic arm prototype.', category: 'INDUCTION', color: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)', image: '/gallery/IMG_20251117_183445.jpg' },
    { id: 4, title: 'Workshop Day', description: 'Members learning soldering and circuitry.', category: 'ROBOSOCCER', color: 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)', image: '/gallery/IMG_6943.JPG' },
    { id: 5, title: 'Autonomous Drone', description: 'Quad-copter with obstacle avoidance.', category: 'ROBOSOCCER', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', image: '/gallery/IMG_6954.JPG' },
    { id: 6, title: 'AI Chess Bot', description: 'Computer vision based chess engine.', category: 'ROBOSOCCER', color: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', image: '/gallery/IMG_6990.JPG' },
    { id: 7, title: 'Line Follower', description: 'High speed line following robot.', category: 'ROBOSOCCER', color: 'linear-gradient(to top, #30cfd0 0%, #330867 100%)', image: '/gallery/IMG_7033.JPG' },
    { id: 8, title: 'Guest Lecture', description: 'Industry expert talk on Future of AI.', category: 'ROBOSOCCER', color: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)', image: '/gallery/IMG_7046.JPG' },
    { id: 9, title: 'Smart Wearable', description: 'Health monitoring wristband prototype.', category: 'ROBOSOCCER', color: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)', image: '/gallery/IMG_7070.JPG' },
    { id: 10, title: 'Home Automation', description: 'Voice controlled lights and fans.', category: 'ROBOSOCCER', color: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)', image: '/gallery/IMG_7093.JPG' },
    { id: 11, title: 'Solar Tracker', description: 'Dual-axis solar panel tracking system.', category: 'ROBOSOCCER', color: 'linear-gradient(to right, #fa709a 0%, #fee140 100%)', image: '/gallery/IMG_7100.JPG' },
    { id: 12, title: 'Maze Solver', description: 'Micromouse robot solving a maze.', category: 'ROBOSOCCER', color: 'linear-gradient(to top, #5ee7df 0%, #b490ca 100%)', image: '/gallery/IMG_7106.JPG' },
    { id: 13, title: 'Face Recognition', description: 'Attendance system using OpenCV.', category: 'ROBOSOCCER', color: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)', image: '/gallery/IMG_7033.JPG' },
    { id: 14, title: 'Hexapod', description: 'Six-legged spider robot.', category: 'ROBOSOCCER', color: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)', image: '/gallery/IMG_7106.JPG' },
    { id: 15, title: 'Tech Expo', description: 'Annual showcase of student projects.', category: 'ROBOSOCCER', color: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)', image: '/gallery/IMG_7046.JPG' },
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
    { name: "Aman Choudhary", role: "TechnoCrats GSV's RED Domain Head", image: "/devs_avatars/aman.jpg", desc: "Passionate about building scalable web applications and exploring new tech stacks.", socials: { instagram: "https://www.instagram.com/mbat_x/", linkedin: "https://www.linkedin.com/in/aman-choudhary-5512372a7/", github: "https://github.com/mbatwc113114" } },
    { name: "Anirban Das", role: "TechnoCrats GSV's RED Domain Member", image: "/devs_avatars/anirban.jpg", desc: "Crafting beautiful and intuitive user interfaces with a focus on user experience.", socials: { instagram: "#", linkedin: "https://www.linkedin.com/in/anirban-das-1783492b6/", github: "https://github.com/dasux" } },
    { name: "Shashank Savarkar", role: "TechnoCrats GSV's RED Domain Member", image: "/devs_avatars/shashank.jpg", desc: "Architecting robust server-side solutions and optimizing database performance.", socials: { instagram: "https://www.instagram.com/shashanksavarkar/", linkedin: "https://www.linkedin.com/in/shashank-savarkar-a001a5328/", github: "https://github.com/shashanksavarkar" } },
    { name: "Suyash Srivastav", role: "TechnoCrats GSV's RED Domain Member", image: "/devs_avatars/suyash.jpg", desc: "Architecting robust server-side solutions and optimizing database performance.", socials: { instagram: "https://www.instagram.com/su.yash_srivastav/", linkedin: "https://www.linkedin.com/in/suyash-srivastav-124391285/", github: "https://github.com/Suyashusesgit" } }
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
