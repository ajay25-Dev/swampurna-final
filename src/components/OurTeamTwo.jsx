import React from 'react'
import styled from 'styled-components'

const OurTeamTwo = ({ profileImage, name, qualification, designation, email, description }) => {
  return (
    <TeamTwo>
      <div className="profileMain">
        <img src={profileImage} alt={`${name} Profile`} className="image" />
        <div className="profile">
          <span>{name}</span>
          <span>{qualification}</span>
          <span>{designation}</span>
          <span>{email}</span>
        </div>
      </div>
      <span className="desc">{description}</span>
    </TeamTwo>
  )
}

const TeamTwo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: #f2e6e6;
  border-radius: 10px;

  .profileMain {
    display: flex;
    gap: 2rem;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  .image {
    height: 10rem;
    width: auto;

    @media (max-width: 768px) {
      height: 15rem;
    }
  }

  .profile {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .desc {
    text-align: justify;
  }
`

export default OurTeamTwo
