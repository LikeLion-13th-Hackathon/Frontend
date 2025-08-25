import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion"; 
import LogoImg from "@/assets/icons/login_logo.png";
import Layout from "@/components/common/Layout";

const LoadingScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.(); // 2초 뒤 전환
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <Layout>
        <Wrapper
          as={motion.div}
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Logo
            as={motion.img}
            src={LogoImg}
            alt="mapin logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </Wrapper>
      </Layout>
    </AnimatePresence>
  );
};

export default LoadingScreen;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 150px;
  max-width: 80%;
`;