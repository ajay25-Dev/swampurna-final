import React from 'react'
import styled from 'styled-components'
import missionImg from '../assets/images/img10.png'
import missionBoxImg from '../assets/images/img8.png'

const MissionTwo = () => {
    return (
        <MisnHeroOne>
            <img src={missionImg} className='img' alt="Vision" />
            <div className='missionBox'>
                <span className='heading'>Our Vision</span>
                <span className='desc'>Our vision is to create a world where menstrual health and hygiene are universally
                    understood, accepted, and prioritized as essential components of personal and community
                    well-being. We aspire to establish a society where adolescent girls and their communities are
                    equipped with the knowledge, tools, and confidence to manage menstrual health without
                    stigma or barriers.
                    We envision the usage of reliable and on-of-a-kind technologys and participatory
                    communication strategies to foster a culture of inclusivity, empowerment, and informed
                    decision-making. By integrating behaviour change methodologies and innovative tools, we
                    aim to build sustainable solutions that address menstrual health challenges across diverse
                    socio-cultural contexts.
                    Our ultimate goal is to contribute to the broader agenda of sustainable development by
                    promoting gender equality, improving health outcomes, and enhancing educational
                    opportunities. Through this initiative, we seek to transform menstrual health from a taboo

                    subject to a normalized and celebrated aspect of holistic development, ensuring a brighter,
                    healthier future for every adolescent girl and her community.</span>
            </div>
        </MisnHeroOne>
    )
}

const MisnHeroOne = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
    padding: 1rem;
    justify-content: space-between;

    .img {
        flex-grow: 1;
        height: auto;
        max-width: 100%;
        object-fit: contain;
        align-self: center;
    }

    .missionBox {
        flex-grow: 1;
        background-image: url(${missionBoxImg});
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        border-radius: 15px;
        width: 100%;
        max-width: 600px;
        gap: 1rem;
    }

    .heading {
        font-size: 2rem;
        text-align: center;
        font-weight: 600;
    }

    .desc {
        font-size: 1rem;
        text-align: justify;
    }

    /* Tablet-specific styles */
    @media (min-width: 768px) and (max-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;

        .img {
            width: 100%;
            max-width: 500px;
            align-self: center;
        }

        .missionBox {
            width: 100%;
            max-width: none;
            padding: 1.5rem;
        }

        .heading {
            font-size: 2.2rem;
        }

        .desc {
            font-size: 1.1rem;
        }
    }

     /* Desktop styles */
    @media (min-width: 1025px) {
        flex-direction: row;

        .missionBox {
            max-width: 60%;
        }

        .heading {
            font-size: 1.5rem;
        }

        .desc {
            font-size: 0.9rem;
        }

        .img {
            max-width: 400px;
        }
    }

    /* Mobile-specific styles */
    @media (max-width: 767px) {
        .missionBox {
            padding: 1rem;
        }

        .heading {
            font-size: 1.5rem;
        }

        .desc {
            font-size: 0.9rem;
        }
    }
`

export default MissionTwo
