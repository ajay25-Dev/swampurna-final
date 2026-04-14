import React from 'react'
import styled from 'styled-components'
import missionImg from '../assets/images/img9.png'
import missionBoxImg from '../assets/images/img8.png'

const MissionOne = () => {
    return (
        <MisnHeroOne>
            <div className='missionBox'>
                <span className='heading'>Our Mission</span>
                <span className='desc'>Our mission is to empower adolescent girls and communities with enhanced knowledge and
                    awareness of menstrual health and hygiene through innovative and participatory approaches.
                    By leveraging state-of-the-art tools, emerging technologies, and behavior change
                    communication strategies, we aim to bridge the knowledge gap and foster sustainable
                    development.
                    We are committed to developing an interactive and user-friendly prototype that serves as a
                    comprehensive platform for educating and engaging adolescents on the critical aspects of
                    menstrual health. This initiative emphasizes collaboration, encouraging active participation
                    from individuals, families, and communities to normalize conversations around menstruation
                    and break the associated taboos.
                    Through participatory communication, we seek to create a supportive environment that not
                    only equips girls with accurate information but also empowers them to make informed
                    decisions about their health and well-being. By integrating advanced technologies such as AI-
                    driven learning tools, mobile applications, and data-driven insights, we strive to offer tailored
                    solutions that resonate with the diverse needs of adolescent girls across different socio-
                    cultural contexts.
                    Ultimately, our mission aligns with the principles of sustainable development by promoting
                    gender equality, enhancing education, and improving overall health outcomes. Together, we
                    aim to transform menstrual health into a topic of collective responsibility, fostering a culture
                    of openness, respect, and empowerment for the betterment of present and future generations.</span>
            </div>
            <img src={missionImg} className='img' alt="Mission" />
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

    .img {
        flex-grow: 1;
        height: auto;
        max-width: 100%;
        object-fit: contain;
    }

    /* Tablet-specific styles */
    @media (min-width: 768px) and (max-width: 1024px) {
        flex-direction: column;
        align-items: flex-start;
        .missionBox {
            width: 100%;
            max-width: none;
            padding: 1.5rem;
        }
        .img {
            width: 100%;
            max-width: 500px;
            align-self: center;
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

export default MissionOne
