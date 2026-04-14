import React from 'react';
import styled from 'styled-components';

const HackathonOne = () => {
  const hackathonContent = {
    sections: [
      {
        title: "1. How to Participate",
        details: [
          'Step 1: Register for the Hackathon by clicking on the "Join Now" button.',
          "Step 2: Choose your preferred track or challenge.",
          "Step 3: Join the community on our designated platforms (Slack, Discord) for updates, resources, and team formation.",
          "Step 4: Work on your project during the timeline (see below).",
          "Step 5: Submit your project by the final deadline.",
        ],
      },
      {
        title: "2. Challenges",
        details: [
          "We're inviting participants to create solutions that address real-world problems faced by marginalized communities when it comes to menstrual health. Choose from one of the following challenges -",
          "Challenge 1: Building a Mobile App for Menstrual Health Education for Adolescents",
          "Challenge 2: Creating a Digital Game to Promote Menstrual Hygiene Awareness",
          "Challenge 3: Developing a Data-Driven Platform to Provide Personalized Menstrual Insights for Women",
          "Challenge 4: Designing Low-Cost Solutions for Menstrual Waste Management in Rural Areas",
        ],
      },
      {
        title: "3. Timeline",
        details: [
          "Registration Opens: November 1, 2024",
          "Team Formation: November 3–5, 2024",
          "Hackathon Begins: November 10, 2024",
          "Mentorship Phase: November 12–14, 2024",
          "Project Submission Deadline: November 20, 2024",
          "Judging Phase: November 21–25, 2024",
          "Winners Announced: November 28, 2024",
        ],
      },
      {
        title: "4. Prize and Recognition",
        details: [
          "By participating in the SWAMPURNA Hackathon, you will have the chance to gain recognition for your skills, network with industry professionals, and win amazing prizes!-",
          "1st Prize: ₹50,000 + Feature in our Global Menstrual Health Conference",
          "2nd Prize: ₹30,000 + Mentorship Opportunity",
          "3rd Prize: ₹15,000 + SWAMPURNA Product Development Support",
          "Special Awards: Best Open-Source Contribution, Best Social Impact Project, Audience Choice Award",
        ],
      },
      {
        title: "5. Participation & Criteria",
        details: [
          "SWAMPURNA Hackathon is open to participants of all ages and backgrounds. Whether you're a student, developer, designer, or social worker, you are welcome to join the challenge. Here's what we're looking for-",
          "Team Size: 1-5 members",
          "Eligibility: Open to anyone passionate about menstrual health, technology, or social innovation",
          "Criteria: Projects will be judged on innovation, impact, feasibility, and technical execution",
        ],
      },
      {
        title: "6. Resources and Support",
        details: [
          "We want you to succeed! During the hackathon, you'll have access to a wide range of resources, including-",
          "Mentorship: Connect with industry experts for guidance",
          "Toolkits: Access to development toolkits, APIs, and templates",
          "Workshops: Attend pre-event workshops on design, coding, and menstrual health solutions",
          "Community: Join our Slack/Discord for team-building and updates",
        ],
      },
      {
        title: "6. FAQs",
        details:[]
      },
    ],
  };

  return (
    <HackathonHero>
      <ContentSection content={hackathonContent} />
    </HackathonHero>
  );
};

const ContentSection = ({ content }) => (
  <>
    {content.sections.map((section, index) => (
      <div className="boxInside" key={index}>
        <span className="title">{section.title}</span>
        {section.details.map((detail, i) => (
          <span className="detail" key={i}>
            {detail.includes(":") ? (
              <>
                <span className="circleDot" />
                <span className="tag">{detail.split(":")[0]}:</span>
                {detail.split(":")[1]}
              </>
            ) : detail.endsWith("-") ? (
              detail
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
    <div className='FaqsBox'>
        <span className='qText'><span className='circleDot2'></span>What skills do I need to participate?</span>
        <span className='ansText'>You don’t need to be an expert. Teams can combine skills in technology, design, and social innovation.</span>
        <span className='qText'><span className='circleDot2'></span>How do I submit my project?</span>
        <span className='ansText'>Submit your final project through our online platform. A detailed submission form will be provided.</span>
        <span className='qText'><span className='circleDot2'></span>How do I submit my project?</span>
        <span className='ansText'>Yes! If you're joining alone, we’ll help you find a team on our Slack/Discord channel.</span>
        <span className='qText'><span className='circleDot2'></span>Is there a fee to participate?</span>
        <span className='ansText'>No, participation is free for everyone.</span>
        <span className='qText'><span className='circleDot2'></span>Can I work on an existing project?</span>
        <span className='ansText'>We encourage original ideas, but if you're building on a previous project, please disclose this during submission.</span>
    </div>
  </>
);

const HackathonHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #cddde2;
  border-radius: 5px;
  border: 1px solid #000000;
  padding: 1rem;

  .boxInside {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 1rem;
  }
    .detail {
    font-size: 16px;
    line-height: 1.5;
    color: #20237b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .tag {
    font-weight: bold;
  }
  .circleDot {
    display: inline-block;
    height: 5px;
    width: 5px;
    border-radius: 80px;
    background-color: #20237b;
    margin-right: 8px;
  }
.FaqsBox{
    display: flex;
    flex-direction: column;
}
.qText{
    color: #FF0000;
}
.ansText{
    margin-left: 1rem;
}
.circleDot2 {
    display: inline-block;
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background-color: #FF0000;
    margin-right: 8px;
  }
    /* Responsive design */
  @media (max-width: 768px) {
    padding: 0.5rem;
    .title {
      font-size: 16px;
    }

    .detail {
      font-size: 14px;
      text-align: justify;
    }

    .tag{
        font-size: 12px;
        text-align: left;
    }

    .qText {
      font-size: 14px;
    }

    .ansText {
      font-size: 12px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 0.5rem;

    .title {
      font-size: 14px;
    }

    .detail {
      font-size: 12px;
      text-align: justify;
    }

    .tag{
        font-size: 12px;
    }

    .qText {
      font-size: 12px;
    }

    .ansText {
      font-size: 10px;
    }
  }
`;

export default HackathonOne;
