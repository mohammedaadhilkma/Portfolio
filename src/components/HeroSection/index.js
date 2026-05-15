import React from 'react';
import HeroBgAnimation from '../HeroBgAnimation';
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle, ResumeButton, CTAContainer } from './HeroStyle';
import { Bio } from '../../data/constants';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div id="about">
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer>
                    <HeroLeftContainer id="Left">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Title>Hi, I'm <br /> <span className="neon-text">{Bio.name}</span></Title>
                            <TextLoop>
                                I am a
                                <Span>
                                    <TypeAnimation
                                        sequence={[
                                            'Full Stack Developer',
                                            2000,
                                            'React Developer',
                                            2000,
                                            'Cloud Enthusiast',
                                            2000,
                                            'MERN Stack Developer',
                                            2000
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        repeat={Infinity}
                                    />
                                </Span>
                            </TextLoop>
                            <SubTitle>{Bio.description}</SubTitle>
                            
                            <CTAContainer>
                                <ResumeButton href="#projects">View Projects</ResumeButton>
                                <ResumeButton outline href={Bio.resume} target='_blank' rel="noopener noreferrer">Download Resume</ResumeButton>
                            </CTAContainer>
                        </motion.div>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            style={{ position: 'relative' }}
                        >
                            <Img src="/HeroImage.jpg" alt="Mohammed Aadhil" />
                            {/* Floating Tech Icons can be added here as absolute elements */}
                        </motion.div>
                    </HeroRightContainer>
                </HeroInnerContainer>
            </HeroContainer>
        </div>
    )
}

export default HeroSection;