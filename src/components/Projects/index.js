import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'
import { motion, AnimatePresence } from 'framer-motion'

const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps to android apps. Here are some of my projects.
        </Desc>
        <ToggleButtonGroup >
          {['all', 'fullstack', 'cloud', 'frontend'].map((category) => (
            <React.Fragment key={category}>
              <ToggleButton 
                active={toggle === category} 
                value={category} 
                onClick={() => setToggle(category)}
              >
                {category.toUpperCase()}
              </ToggleButton>
              {category !== 'frontend' && <Divider />}
            </React.Fragment>
          ))}
        </ToggleButtonGroup>
        <CardContainer>
          <AnimatePresence>
            {toggle === 'all' && projects
              .map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
                </motion.div>
              ))}
            {projects
              .filter((item) => item.category === toggle)
              .map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCard project={project} openModal={openModal} setOpenModal={setOpenModal}/>
                </motion.div>
              ))}
          </AnimatePresence>
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects