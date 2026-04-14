import React from 'react';
import styled from 'styled-components';

const LtextRimg = ({ heading, description, image }) => {
    return (
        <LtextRimgHero>
            <div className="mainHero">
                <img src={image} alt="Back Image" className="imag" />
                <div className="mainTxt">
                    <span className="heading">{heading}</span>
                    <span className="desc">{description}</span>
                </div>
            </div>
        </LtextRimgHero>
    );
};

const LtextRimgHero = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;

    .mainHero {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .mainTxt {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 50%;
    }

    .desc {
        font-size: 18px;
        text-align: justify;
    }

    .heading {
        font-size: 25px;
        font-weight: bold;
    }

    .imag {
        height: auto;
        width: 30rem;
        max-width: 100%; /* Ensures the image scales properly */
        border-radius: 10px; /* Optional for a more polished look */
    }

    /* Media Queries for Responsiveness */
    @media (max-width: 768px) { /* Tablet */
        .mainHero {
            flex-direction: column;
            align-items: flex-start; /* Align items to the start */
        }
        .mainTxt {
            width: 100%; /* Full width on smaller screens */
        }
        .desc {
            font-size: 16px;
        }
        .heading {
            font-size: 22px;
        }
        .imag {
            width: 20rem;
        }
    }

    @media (max-width: 480px) { /* Mobile */
        padding: 1rem;
        .mainHero {
            flex-direction: column;
            align-items: center; /* Center align for mobile */
        }
        .mainTxt {
            width: 100%;
            text-align: center; /* Center text for smaller screens */
        }
        .desc {
            font-size: 14px;
        }
        .heading {
            font-size: 20px;
        }
        .imag {
            width: 100%; /* Full width image */
        }
    }
`;

export default LtextRimg;
