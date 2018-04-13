import styled from '../Theme';

export const LandingText = styled.header`
  margin: 0;
  color: #fefefa;
  opacity: 0.8;
`;

export const LandingTitle = LandingText.extend`
  font-size: 3.65rem;
`;

export const LandingSubtitle = LandingText.extend`
  font-size: 1.125rem;
`;

export default LandingText;