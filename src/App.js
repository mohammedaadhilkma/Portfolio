import { ThemeProvider } from "styled-components";
import { useState, useEffect, useMemo } from "react";
import { darkTheme, lightTheme } from './utils/Themes.js';
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #050505;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  flex-direction: column;
`;

const Logo = styled(motion.div)`
  font-size: 3rem;
  font-weight: 800;
  color: #00f2ff;
  letter-spacing: 5px;
  text-shadow: 0 0 20px rgba(0, 242, 255, 0.5);
`;

const Cursor = styled.div.attrs(props => ({
  style: {
    left: `${props.x}px`,
    top: `${props.y}px`,
  },
}))`
  position: fixed;
  width: 20px;
  height: 20px;
  border: 2px solid #00f2ff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
  @media (max-width: 768px) { display: none; }
`;

const CursorFollower = styled.div.attrs(props => ({
  style: {
    left: `${props.x}px`,
    top: `${props.y}px`,
  },
}))`
  position: fixed;
  width: 8px;
  height: 8px;
  background: #7000ff;
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease-out;
  @media (max-width: 768px) { display: none; }
`;

function App() {
  const [darkMode] = useState(true);
  const [openModal, setOpenModal] = useState({ state: false, project: null });
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <AnimatePresence>
          {loading ? (
            <LoadingScreen
              key="loading"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -1000 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <Logo
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              >
                MA
              </Logo>
              <motion.div
                style={{ marginTop: "20px", color: "#fff", fontSize: "14px", letterSpacing: "2px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                INITIALIZING FUTURISTIC EXPERIENCE...
              </motion.div>
            </LoadingScreen>
          ) : null}
        </AnimatePresence>

        <Cursor x={mousePos.x} y={mousePos.y} />
        <CursorFollower x={mousePos.x} y={mousePos.y} />

        <Navbar />
        <Body>
          <div className="blob" style={{ top: "10%", left: "10%" }}></div>
          <div className="blob" style={{ bottom: "10%", right: "10%", background: "#7000ff" }}></div>
          
          <HeroSection />
          <About />
          <Skills />
          <Experience />
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <Education />
          <Contact />
          <Footer />
          
          <AnimatePresence>
            {openModal.state && (
              <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
            )}
          </AnimatePresence>
        </Body>
      </Router>
    </ThemeProvider>
  );
}

export default App;