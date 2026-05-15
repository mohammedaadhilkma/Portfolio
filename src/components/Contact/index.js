import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaWhatsapp, FaCopy, FaCheck } from 'react-icons/fa';
import { Bio } from '../../data/constants';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 80px 0;
  @media (max-width: 960px) {
      padding: 40px 0;
  }
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  width: 95%;
  max-width: 1200px;
  gap: 40px;
  @media (max-width: 960px) {
      flex-direction: column;
      align-items: center;
  }
`

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 960px) {
      align-items: center;
      text-align: center;
  }
`;

const RightSection = styled.div`
  flex: 1;
  width: 100%;
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
  @media (max-width: 768px) {
      font-size: 36px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  max-width: 500px;
  line-height: 1.6;
`;

const ContactInfoCard = styled(motion.div)`
  background: ${({ theme }) => theme.card_light + "80"};
  backdrop-filter: blur(10px);
  padding: 24px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.primary + "30"};
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 400px;
  margin-top: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
  border-radius: 12px;
  transition: all 0.3s ease;
  &:hover {
    background: ${({ theme }) => theme.primary + "15"};
    transform: translateX(10px);
  }
`;

const IconWrapper = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: ${({ theme }) => theme.gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
`;

const ContactForm = styled(motion.form)`
  width: 100%;
  background-color: ${({ theme }) => theme.card};
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${({ theme }) => theme.gradient};
  }
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 500;
`;

const ContactInput = styled.input`
  background: ${({ theme }) => theme.bgLight + "80"};
  border: 1px solid ${({ theme }) => theme.primary + "30"};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 14px 16px;
  transition: all 0.3s ease;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.bgLight};
    box-shadow: 0 0 15px ${({ theme }) => theme.primary + "30"};
  }
`

const ContactInputMessage = styled.textarea`
  background: ${({ theme }) => theme.bgLight + "80"};
  border: 1px solid ${({ theme }) => theme.primary + "30"};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 14px 16px;
  transition: all 0.3s ease;
  resize: none;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.bgLight};
    box-shadow: 0 0 15px ${({ theme }) => theme.primary + "30"};
  }
`

const ContactButton = styled(motion.button)`
  width: 100%;
  background: ${({ theme }) => theme.gradient};
  padding: 16px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);
  const form = useRef();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(Bio.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);

    // 🚀 Using Formspree for "AI-style" Automatic Form Submitting
    // This will send REAL emails to mohammedaadhilkma@gmail.com
    // Note: The first time you use this, Formspree will send YOU an email to confirm.
    
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());

    try {
      // Using your email directly with Formspree for automatic setup!
      const response = await fetch(`https://formspree.io/f/xykoqldl`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSending(false);
        setOpen(true);
        form.current.reset();
        console.info("Success! Check your email to confirm the Formspree setup.");
      } else {
        throw new Error("Formspree submission failed");
      }
    } catch (err) {
      setSending(false);
      setError(true);
      console.error('Submission Error:', err);
    }
  }

  return (
    <Container id="contact">
      <Wrapper>
        <LeftSection>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Title className="neon-text">Let's Talk! 🚀</Title>
            <Desc>
              I'm always open to new opportunities and collaborations. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </Desc>

            <ContactInfoCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <ContactItem onClick={handleCopyEmail}>
                <IconWrapper><FaEnvelope /></IconWrapper>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>Email me at</div>
                  <div>{Bio.email}</div>
                </div>
                {copied ? <FaCheck style={{ color: '#00f2ff' }} /> : <FaCopy style={{ opacity: 0.5 }} />}
              </ContactItem>

              <ContactItem as="a" href={Bio.linkedin} target="_blank" style={{ textDecoration: 'none' }}>
                <IconWrapper><FaLinkedin /></IconWrapper>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>LinkedIn</div>
                  <div>Message on LinkedIn</div>
                </div>
              </ContactItem>

              <ContactItem as="a" href={`https://wa.me/917868955504`} target="_blank" style={{ textDecoration: 'none' }}>
                <IconWrapper style={{ background: 'linear-gradient(225deg, #25D366 0%, #128C7E 100%)' }}><FaWhatsapp /></IconWrapper>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>WhatsApp</div>
                  <div>Chat on WhatsApp</div>
                </div>
              </ContactItem>
            </ContactInfoCard>
          </motion.div>
        </LeftSection>

        <RightSection>
          <ContactForm 
            ref={form} 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <InputGroup>
              <Label>Your Name</Label>
              <ContactInput placeholder="Enter your name" name="from_name" required />
            </InputGroup>
            
            <InputGroup>
              <Label>Email Address</Label>
              <ContactInput placeholder="Enter your email" name="from_email" required type="email" />
            </InputGroup>
            
            <InputGroup>
              <Label>Subject</Label>
              <ContactInput placeholder="What's this about?" name="subject" required />
            </InputGroup>
            
            <InputGroup>
              <Label>Message</Label>
              <ContactInputMessage placeholder="Type your message here..." rows="5" name="message" required />
            </InputGroup>

            <ContactButton 
              type="submit" 
              disabled={sending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {sending ? "Sending..." : "Send Message"}
            </ContactButton>
          </ContactForm>
        </RightSection>

        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%', background: '#00f2ff', color: '#000' }}>
            Message sent successfully! I'll get back to you soon.
          </Alert>
        </Snackbar>

        <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
          <Alert onClose={() => setError(false)} severity="error" sx={{ width: '100%' }}>
            Failed to send message. Please try the direct contact options!
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  )
}

export default Contact