import React from 'react';
import styled from 'styled-components';

const SolutionCard = ({ title, children }) => {
  return (
    <StyledWrapper>
      <div className="solution_card">
        <div className="hover_color_bubble" />
        <div className="solu_title">
          <h3>{title}</h3>
        </div>
        <div className="solu_description">
          {children}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Main Container Styling */
  display: flex;
  height: 100%;
  
  .solution_card {
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(136, 144, 195, 0.2),
      0 5px 15px 0 rgba(37, 44, 97, 0.15);
    border-radius: 15px;
    padding: 10px 15px;
    position: relative;
    z-index: 1;
    overflow: hidden;
    min-height: 265px;
    transition: 0.7s;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .solution_card:hover {
    background: #ef4444; /* Red 1: Bright Red for main background */
    color: #fff;
    transform: scale(1.05);
    z-index: 9;
  }

  .solution_card:hover::before {
    background: rgb(185 28 28 / 10%); /* Red 2: Darker Red for shape */
  }

  .solution_card:hover .solu_title h3,
  .solution_card:hover .solu_description p {
    color: #fff;
  }

  .solution_card:before {
    content: "";
    position: absolute;
    background: rgb(185 28 28 / 5%); /* Red 2: Darker Red for static shape */
    width: 170px;
    height: 400px;
    z-index: -1;
    transform: rotate(42deg);
    right: -56px;
    top: -23px;
    border-radius: 35px;
  }

  .solution_card .solu_title h3 {
    color: #212121;
    font-size: 1.3rem;
    margin-top: 13px;
    margin-bottom: 13px;
    font-weight: 700;
  }

  .solution_card .solu_description p {
    font-size: 15px;
    margin-bottom: 15px;
  }

  .hover_color_bubble {
    position: absolute;
    background: rgb(220 38 38 / 15%); /* Red 3: Mid Red for bubble */
    width: 100rem;
    height: 100rem;
    left: 0;
    right: 0;
    z-index: -1;
    top: 16rem;
    border-radius: 50%;
    transform: rotate(-36deg);
    left: -18rem;
    transition: 0.7s;
  }

  .solution_card:hover .hover_color_bubble {
    top: 0rem;
  }
`;

export default SolutionCard;
