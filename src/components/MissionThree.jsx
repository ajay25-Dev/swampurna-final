import React from 'react';
import styled from 'styled-components';

const MissionThree = ({ heading, values }) => {
    return (
        <MisnHeroThree>
            <span className='heading'>{heading}</span>
            {values.map((value, index) => (
                <span key={index} className='desc'>{value}</span>
            ))}
        </MisnHeroThree>
    );
};

const MisnHeroThree = styled.div`
    background: linear-gradient(to bottom, #a7e7f8, #d6f5fa);
    border: 5px solid #eab7a8;
    box-sizing: border-box;
    padding: 2rem;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 100%;

    .heading {
        font-size: 22px;
        font-weight: 600;
        text-align: center;
    }

    .desc {
        font-size: 16px;
    }

    @media (max-width: 768px) { 
        padding: 1.5rem;
        .heading {
            font-size: 22px;
        }
        .desc {
            font-size: 16px;
            text-align: justify;
        }
    }

    @media (max-width: 480px) {
        padding: 1rem;
        .heading {
            font-size: 20px;
        }
        .desc {
            font-size: 14px;
            text-align: justify;
        }
    }
`;

export default MissionThree;
