import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

import Header from "./header";
import Sidebar from "./sidebar";

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-rows: 75px 1fr;
  grid-template-columns: minmax(150px, 17vw) 1fr;
  height: 100vh;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

export default function Layout({ children }) {
  return (
    <LayoutWrapper>
      <Global
        styles={css`
          body {
            padding: 0;
            margin: 0;
          }
        `}
      ></Global>
      <Header />
      <Sidebar />
      <main style={{ gridColumn: "2 / 3", gridRow: "2 / 3" }}>{children}</main>
    </LayoutWrapper>
  );
}
