import React from 'react';
import styled from 'styled-components';
import OurTeamOne from '../components/OurTeamOne';
import PeriodSelection from '../components/PeriodSelection';

const PeriodTracker = () => {
    const heading = 'Track Your Cycle'
    const description = '"Stay in tune with your body. Easily track your periods, predict upcoming cycles, and get personalized health tips."'

    return (
        <PeriodTrack>
            <OurTeamOne
                heading={heading}
                description={description}
            />
            <PeriodSelection />
        </PeriodTrack>
    )
}

const PeriodTrack = styled.div`
padding: 1rem 2rem 0rem 2rem;
display: flex;
flex-direction: column;
gap: 1rem;
`

export default PeriodTracker
