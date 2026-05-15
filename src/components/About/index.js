import React from 'react';
import styled from 'styled-components';
import { Bio, stats } from '../../data/constants';
import { motion } from 'framer-motion';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px 0;
    position: relative;
    z-index: 1;
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1100px;
    display: flex;
    gap: 40px;
    align-items: center;
    @media (max-width: 960px) {
        flex-direction: column;
    }
`;

const ImageContainer = styled(motion.div)`
    flex: 1;
    display: flex;
    justify-content: center;
    position: relative;
`;

const Img = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 20px;
    object-fit: cover;
    border: 2px solid ${({ theme }) => theme.primary};
    box-shadow: 0 0 20px ${({ theme }) => theme.primary + "50"};
`;

const Content = styled.div`
    flex: 1.5;
    display: flex;
    flex-direction: column;
    gap: 20px;
    @media (max-width: 960px) {
        text-align: center;
        align-items: center;
    }
`;

const Title = styled.h2`
    font-size: 42px;
    font-weight: 700;
    color: ${({ theme }) => theme.text_primary};
`;

const Text = styled.p`
    font-size: 18px;
    line-height: 1.6;
    color: ${({ theme }) => theme.text_secondary};
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 100%;
    margin-top: 20px;
`;

const StatCard = styled(motion.div)`
    padding: 20px;
    border-radius: 16px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatValue = styled.div`
    font-size: 32px;
    font-weight: 700;
    color: ${({ theme }) => theme.primary};
`;

const StatLabel = styled.div`
    font-size: 14px;
    color: ${({ theme }) => theme.text_secondary};
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const About = () => {
    return (
        <Container id="about">
            <Wrapper>
                <ImageContainer
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Img src="/HeroImage.jpg" alt="Mohammed Aadhil" />
                    <div className="blob" style={{ width: '200px', height: '200px', filter: 'blur(50px)', top: '-20px', left: '-20px' }}></div>
                </ImageContainer>
                
                <Content>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <Title>About Me</Title>
                        <Text>{Bio.description}</Text>
                        
                        <StatsGrid>
                            {stats.map((stat, index) => (
                                <StatCard
                                    key={index}
                                    whileHover={{ scale: 1.05 }}
                                    className="glass"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <StatValue className="neon-text">
                                        {stat.value}{stat.suffix}
                                    </StatValue>
                                    <StatLabel>{stat.label}</StatLabel>
                                </StatCard>
                            ))}
                        </StatsGrid>
                    </motion.div>
                </Content>
            </Wrapper>
        </Container>
    );
};

export default About;