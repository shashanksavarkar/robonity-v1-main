# Robonity 🤖

> **The Premier Community for Robotics Creators, Engineers, and Hobbyists.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React-61DAFB?logo=react&logoColor=black)
![Node](https://img.shields.io/badge/backend-Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/database-MongoDB-47A248?logo=mongodb&logoColor=white)

---

## 📖 About

**Robonity** is a collaborative platform designed to bring the robotics community together. Whether you are a student, a professional engineer, or a hobbyist, Robonity provides the tools you need to share your projects, discover resources, participate in events, and connect with like-minded innovators.

Our mission is to foster innovation and learning in the field of robotics through community engagement and shared knowledge.

## ✨ Features

*   **🚀 Project Showcase:** Share your latest robotics builds with detailed documentation, images, and videos.
*   **📅 Event Management:** Discover and register for robotics workshops, hackathons, and webinars.
*   **💬 Community Forum:** Discuss ideas, ask for help, and share insights on our dedicated discussion board.
*   **📚 Resource Hub:** Access a curated library of tutorials, datasheets, and learning materials.
*   **🔐 Secure Authentication:** User accounts secured with Passport.js (Google & GitHub OAuth support).
*   **🎨 Immersive UI:** A "Holo/Tech" aesthetic powered by Three.js, GSAP, and Glassmorphism design principles.

## 🛠 Tech Stack

### Frontend
*   **Framework:** [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Animations:** [GSAP](https://greensock.com/gsap/), [Framer Motion](https://www.framer.com/motion/)
*   **3D Graphics:** [Three.js](https://threejs.org/) (@react-three/fiber, @react-three/drei)
*   **Smooth Scroll:** [Lenis](https://github.com/studio-freight/lenis)

### Backend
*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express.js](https://expressjs.com/)
*   **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
*   **Authentication:** [Passport.js](https://www.passportjs.org/)
*   **Logging:** [Winston](https://github.com/winstonjs/winston)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16+)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)
*   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/shashanksavarkar/robonity-v1.git
    cd robonity-v1-main
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    *   Create a `.env` file in the `backend` directory and configure the following variables:
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        # OAuth credentials if developing auth features
        GOOGLE_CLIENT_ID=...
        GOOGLE_CLIENT_SECRET=...
        GITHUB_CLIENT_ID=...
        GITHUB_CLIENT_SECRET=...
        ```

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend Server**
    ```bash
    cd backend
    npm run dev
    ```
    *Server will start on http://localhost:5000*

2.  **Start the Frontend Development Server**
    ```bash
    cd frontend
    npm run dev
    ```
    *Client will run on http://localhost:5173*

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please verify our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by the Robonity Team
</p>
