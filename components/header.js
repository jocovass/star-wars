import styled from "@emotion/styled";

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid rgba(0, 0, 0, 0.15);
  font-size: 1.3rem;
  font-weight: bold;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
`;

export default function Header() {
  const getDate = () => {
    const today = new Date();

    return today.toLocaleDateString();
  };
  return <StyledHeader>{getDate()}</StyledHeader>;
}
