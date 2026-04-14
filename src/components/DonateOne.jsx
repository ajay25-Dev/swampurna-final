import React from 'react';
import styled from 'styled-components';

const DonateOne = () => {
  const volunteerContent = {
    heading: "Volunteer",
    sections: [
      {
        title: "1. Why Volunteer?",
        details: [
          "Volunteering with SWAMPURNA is a unique opportunity to help create lasting change in menstrual health awareness. Whether you're a healthcare professional, a teacher, a designer, a developer, or simply passionate about making a difference, we have a place for you! Our volunteers help with:",
          "Conducting menstrual health workshops in schools and communities",
          "Designing educational materials and digital content",
          "Developing innovative tools and solutions for menstrual health education",
          "Organizing community events and awareness campaigns",
          "Mentoring young girls and supporting behavior change initiatives",
        ],
      },
      {
        title: "2. How to Volunteer",
        details: [
          "Step 1: Fill out the volunteer application form by clicking 'Join Us.'",
          "Step 2: Choose the area of volunteering you're interested in (education, design, tech, community outreach).",
          "Step 3: Attend our volunteer orientation to get started.",
          "Step 4: Start making a difference!",
        ],
      },
    ],
  };

  const donateContent = {
    heading: "Donate",
    sections: [
      {
        title: "1. Why Donate?",
        details: [
          "Emphasize the importance of financial support and how donations help sustain and expand SWAMPURNA’s programs. Your generous donation helps us reach more communities, develop innovative solutions, and provide essential menstrual health education. With your support, we can:",
          "Provide menstrual hygiene kits to marginalized girls",
          "Expand our digital platform for menstrual health education",
          "Support ongoing research to improve menstrual hygiene practices",
          "Empower communities to create sustainable, long-term solutions",
        ],
      },
      {
        title: "2. How to Donate",
        details: [
          "Step 1: Choose a one-time donation or set up a recurring monthly donation.",
          "Step 2: Select the amount you’d like to give.",
          "Step 3: Complete the secure payment process.",
          "Step 4: Receive a thank-you email and updates on how your donation is making a difference.",
        ],
      },
      {
        title: "3. Where Your Donations Go",
        details: [
          "40% - Educational materials and workshops",
          "30% - Research and development of menstrual health tools",
          "20% - Menstrual hygiene kit distribution",
          "10% - Administrative costs to ensure we continue running smoothly",
        ],
      },
    ],
  };

  return (
    <DonateHeroOne>
      <ContentSection content={volunteerContent} />
      <ContentSection content={donateContent} />
    </DonateHeroOne>
  );
};

const ContentSection = ({ content }) => (
  <>
    <span className="heading">{content.heading}</span>
    {content.sections.map((section, index) => (
      <div className="boxInside" key={index}>
        <span className="title">{section.title}</span>
        {section.details.map((detail, i) => (
          <span className="detail" key={i}>
            {detail.startsWith("Step") ? (
              <>
                <span className="circleDot" />
                <span className="tag">{detail.split(":")[0]}:</span>
                {detail.split(":")[1]}
              </>
            ) : (
              <>
                <span className="circleDot" />
                {detail}
              </>
            )}
          </span>
        ))}
      </div>
    ))}
  </>
);

const DonateHeroOne = styled.div`
  background-color: #cddde2;
  border-radius: 5px;
  border: 1px solid #000000;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  .boxInside {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .heading {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 1rem;
  }
  .tag {
    font-weight: bold;
  }
  .circleDot {
    display: inline-block;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: #20237b;
    margin-right: 8px;
  }
`;

export default DonateOne;
