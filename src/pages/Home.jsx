import React from 'react';
import styled from 'styled-components';
import HomeOne from '../components/HomeOne';
import HomeTwo from '../components/HomeTwo';
import HomeThree from '../components/HomeThree';
import HomeFour from '../components/HomeFour';
import HomeFive from '../components/HomeFive';
import HomeSix from '../components/HomeSix';

const Home = () => {
  return (
    <HomePage>
      {/* Hero Section */}
      <HomeOne />
      
      {/* Principal Investigator Section */}
      <HomeTwo />
      
      {/* About Us - Accordion & Video */}
      <HomeThree />
      
      {/* News & Events */}
      <HomeFour />
      
      {/* Recent Articles */}
      <HomeFive />
      
      {/* Why Choose Us */}
      <HomeSix />
    </HomePage>
  );
};

const HomePage = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;

  /* Add smooth scroll reveal for sections */
  & > section {
    opacity: 1;
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
`;

export default Home;
