import React from 'react';
import styled from 'styled-components';
import Button from './Button'

const Joinleftimg = ({ 
  mainHeading = "Join as a Partner", 
  heading, 
  description, 
  image, 
  partnershipDetails = [], 
  howToJoin = [],
  btnTxt,
}) => {
  return (
    <LtextRimgHero>
      <span className="mainHead">{mainHeading}</span>
      <div className="mainHero">
        <img src={image} alt="Partnership" className="imag" />
        <div className="mainTxt">
          <span className="heading">{heading}</span>
          <p className="desc">{description}</p>
          {partnershipDetails.length > 0 && (
            <div className="partnershipDetails">
              <h3>Partnership Opportunities:</h3>
              <ul>
                {partnershipDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
          {howToJoin.length > 0 && (
            <div className="howToJoin">
              <h3>How to Become a Partner:</h3>
              <ul>
                {howToJoin.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Button 
        text={btnTxt}
        onClick={() => alert('View More clicked!')}
        gradientColors="linear-gradient(90deg, #164080, #2D9382)"
        textColor="#ffffff"
        textSize='0.6rem'
      />
    </LtextRimgHero>
  );
};

const LtextRimgHero = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
  background-color: #CDDDE2;
  border-radius: 5px;
  border: 1px solid #000000;
  gap: 2rem;

  .mainHero {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 2rem;
  }

  .mainTxt {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 50%;
  }

  .mainHead {
    font-size: 24px;
    font-weight: 700;
    color: #20237B;
    text-align: center;
  }

  .heading {
    font-size: 20px;
    font-weight: 600;
    color: #20237B;
  }

  .desc {
    font-size: 14px;
    color: #20237B;
    text-align: justify;
  }

  .partnershipDetails, .howToJoin {
    h3 {
      font-size: 16px;
      color: #20237B;
      margin-bottom: 0.5rem;
    }
    ul {
      margin: 0;
      padding-left: 1.5rem;
      list-style-type: disc;
      color: #20237B;
      font-size: 14px;
    }
    li {
      margin-bottom: 0.5rem;
    }
  }

  .imag {
    width: 40%;
    border-radius: 10px;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    .mainHero {
      flex-direction: column;
    }
    .mainTxt {
      width: 100%;
    }
    .imag {
      width: 100%;
    }
  }
`;

export default Joinleftimg;
