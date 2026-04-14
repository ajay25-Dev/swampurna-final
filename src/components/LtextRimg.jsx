import React from 'react';
import styled from 'styled-components';

const LtextRimg = ({ heading, description, image }) => {
    return (
        <LtextRimgHero>
            <div className="mainHero">
                <div className="mainTxt">
                    <span className="heading">{heading}</span>
                    <span className="desc">{description}</span>
                </div>
                <img src={image} alt="Back Image" className="imag" />
            </div>
        </LtextRimgHero>
    );
};

const LtextRimgHero = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3rem;

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
        max-width: 100%; /* Ensures the image doesn't overflow */
        border-radius: 10px; /* Optional for a polished look */
    }

    /* Media Queries for Responsiveness */
    @media (max-width: 768px) { /* Tablet */
        padding: 2rem;

        .mainHero {
            flex-direction: column; /* Stack the text and image vertically */
            align-items: center;
        }

        .mainTxt {
            width: 100%;
            text-align: center; /* Center-align text for a balanced layout */
        }

        .desc {
            font-size: 16px;
        }

        .heading {
            font-size: 22px;
        }

        .imag {
            width: 20rem; /* Adjust image size for tablet screens */
        }
    }

    @media (max-width: 480px) { /* Mobile */
        padding: 1rem;

        .mainHero {
            flex-direction: column; /* Stack content vertically */
            align-items: center;
        }

        .mainTxt {
            width: 100%;
            text-align: center; /* Center text for readability on small screens */
        }

        .desc {
            font-size: 14px;
        }

        .heading {
            font-size: 20px;
        }

        .imag {
            width: 100%; /* Make the image fill available width */
        }
    }
`;

export default LtextRimg;
