import React from 'react';
import styled from 'styled-components';
import Button from './Button'

const CompetitionTwo = ({ image, heading, date, location, description, text, onClick, gradientColors, textColor, textSize }) => {
    return (
        <EventHero>
            <img src={image} alt='eventImage' className='imge' />
            <span className='heading'>{heading}</span>
            <span className='date'>
                <span className='boldTag'>Date:</span> {date}
            </span>
            <span className='location'>
                <span className='boldTag'>Location:</span> {location}
            </span>
            <span className='description'>
                <span className='boldTag'>Description:</span> {description}
            </span>
            <Button 
                text={text}
                onClick={onClick}
                gradientColors={gradientColors}
                textColor={textColor}
                textSize={textSize}
            />
        </EventHero>
    );
};

const EventHero = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .imge {
        width: auto;
        height: auto;
    }
    .heading {
        font-weight: bold;
        font-size: 20px;
        text-align: center;
    }
    .date {
        padding: 0rem 2rem;
    }
    .location {
        padding: 0rem 2rem;
    }
    .description {
        text-align: justify;
        padding: 0rem 2rem;
    }
    .boldTag {
        font-weight: bold;
    }
`;

export default CompetitionTwo;
