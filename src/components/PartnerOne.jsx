import React from 'react';
import styled from 'styled-components';

const PartnerOne = ({ partners, heading }) => {
  return (
    <PartnerHero>
      <span className='heading'>{heading}</span>
      {partners.map((partner, index) => (
        <div key={index} className='partner-section'>
          <span className='title'>{partner.title}</span>
          <span className='desc'>{partner.description}</span>
          {partner.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className='tag'>
              <span className='circleDot'></span>
              {tag}
            </span>
          ))}
        </div>
      ))}
    </PartnerHero>
  );
};

const PartnerHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #CDDDE2;
  border-radius: 5px;
  border: 1px solid #000000;
  padding: 1rem;

  .heading {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
  }

  .partner-section{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .title {
    font-size: 22px;
    font-weight: 600;
  }
  .desc {
    font-size: 16px;
  }
  .circleDot {
    display: inline-block;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: #20237B;
    margin-right: 8px;
  }
  .tag {
    font-size: 16px;
  }
`;

export default PartnerOne;
