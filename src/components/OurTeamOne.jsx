import React from 'react'
import styled from 'styled-components'

const OurTeamOne = ( {heading, description}) => {
    return (
        <TeamOne>
            <span className='heading'>{heading}</span>
            <span className='title'>{description}</span>
        </TeamOne>
    )
}

const TeamOne = styled.div`
background: linear-gradient(to bottom right, #9BA5C6, #A6CFDD);
box-sizing: border-box;
padding: 1.5rem;
border-radius: 15px;
display: flex;
flex-direction: column;
gap: 1rem;
max-width: 100%;
.heading{
    font-size: 22px;
    font-weight: bold;
    text-align: center;
}
.title{
    font-size: 15px;
    text-align: center;
}
`

export default OurTeamOne