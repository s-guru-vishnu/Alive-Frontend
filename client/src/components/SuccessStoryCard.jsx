import React from 'react';
import styled from 'styled-components';

const SuccessStoryCard = ({ title, description, stat, statLabel, icon, theme }) => {
  return (
    <StyledWrapper $theme={theme}>
      <div className="card">
        <div className="overlay" />
        <div className="circle">
          {icon}
        </div>
        <div className="content">
          <h3>{title}</h3>
          <p className="description">{description}</p>
          <div className="stats">
            <span className="stat-number">{stat}</span>
            <span className="stat-label">{statLabel}</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;

  /* Dynamic Theme Variables */
  --bg-color: ${props => props.$theme?.bgColor || '#DCE9FF'};
  --bg-color-light: ${props => props.$theme?.bgColorLight || '#f1f7ff'};
  --text-color-primary: ${props => props.$theme?.textColor || '#4C5656'};
  --text-color-hover: ${props => props.$theme?.textColorHover || '#1f2937'};
  --box-shadow-color: ${props => props.$theme?.boxShadowColor || 'rgba(220, 233, 255, 0.48)'};
  --accent-color: ${props => props.$theme?.accentColor || '#2563EB'};

  .card {
    width: 100%;
    height: 100%; /* Changed from min-height: 400px to ensure equal height */
    min-height: 400px; /* Keep min-height for safety */
    background: #fff;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    box-shadow: 0 14px 26px rgba(0,0,0,0.04);
    transition: all 0.3s ease-out;
    text-decoration: none;
    padding: 2rem;
    text-align: center;
    border: 1px solid var(--bg-color-light);
  }

  .card:hover {
    transform: translateY(-5px) scale(1.005) translateZ(0);
    box-shadow: 0 24px 36px rgba(0,0,0,0.11),
      0 24px 46px var(--box-shadow-color);
  }

  .card:hover .overlay {
    transform: scale(25) translateZ(0); /* Increased from 8 to 25 to ensure full coverage */
  }

  .card:hover .circle {
    border-color: var(--bg-color-light);
    background: var(--bg-color);
    transform: scale(1.1);
  }

  .card:hover .circle:after {
    background: var(--bg-color-light);
  }

  .card:hover .content h3,
  .card:hover .content .description,
  .card:hover .content .stat-label {
    color: var(--text-color-hover);
  }
  
  .card:hover .content .stat-number {
    color: var(--accent-color);
    transform: scale(1.1);
  }

  .card:active {
    transform: scale(1) translateZ(0);
    box-shadow: 0 15px 24px rgba(0,0,0,0.11),
      0 15px 24px var(--box-shadow-color);
  }

  /* Typography & Content */
  .content {
    z-index: 1000;
    margin-top: 30px;
    width: 100%;
  }

  .content h3 {
    font-size: 24px;
    font-weight: 700;
    color: var(--text-color-primary);
    margin-bottom: 1rem;
    font-family: 'Playfair Display', serif; /* Updated to match site display font */
    transition: color 0.3s ease-out;
  }

  .content .description {
    font-size: 16px;
    color: #6b7280;
    margin-bottom: 2rem;
    line-height: 1.6;
    font-family: 'Inter', sans-serif; /* Updated to match site body font */
    transition: color 0.3s ease-out;
  }

  .stats {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .stat-number {
    font-size: 3rem;
    font-weight: 800;
    color: var(--text-color-primary);
    line-height: 1;
    font-family: 'Playfair Display', serif; /* Consistent display font */
    transition: all 0.3s ease-out;
  }

  .stat-label {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #9ca3af;
    font-family: 'Inter', sans-serif;
    transition: color 0.3s ease-out;
  }

  /* Circle & Icon */
  .circle {
    width: 131px;
    height: 131px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease-out;
    margin-bottom: 1rem;
  }

  .circle:after {
    content: "";
    width: 118px;
    height: 118px;
    display: block;
    position: absolute;
    background: var(--bg-color);
    border-radius: 50%;
    transition: opacity 0.3s ease-out;
  }

  .circle svg {
    z-index: 10000;
    transform: translateZ(0);
    width: 60px;
    height: 60px;
  }

  .overlay {
    width: 118px;
    position: absolute;
    height: 118px;
    border-radius: 50%;
    background: var(--bg-color);
    top: 50px; 
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    transition: transform 0.3s ease-out;
  }
`;

export default SuccessStoryCard;
