import React from 'react';
import styled from 'styled-components';
import image1 from '../assets/images/img33.png';

const CompetitionOne = () => {
  return (
    <CompetitionHero>
      <span className="heading">
        SWAMPURNA Competitions & Events: Empowering Communities through Action
      </span>
      <span className="desc">
        At SWAMPURNA, we believe in the power of collaboration, creativity, and
        learning through action. Our competitions and events are designed to
        bring together young minds, educators, healthcare professionals, and
        community members to work towards sustainable menstrual health and
        hygiene solutions. Here’s a glimpse of what’s happening.
      </span>
    </CompetitionHero>
  );
};

const CompetitionHero = styled.div`
  background-image: url(${image1});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  color: #fff;
  border-radius: 5px;

  .heading {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 1rem;
  }

  .desc {
    text-align: center;
    font-size: 16px;
    line-height: 1.5;
    margin: 0 auto;
    // max-width: 900px;
  }
`;

export default CompetitionOne;
