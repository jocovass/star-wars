import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Link from "next/link";

const StyledSidebar = styled.aside`
  padding: 4.68rem 1rem 1rem;
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  border-right: 2px solid rgba(0, 0, 0, 0.1);
`;

const StyledNav = styled.nav`
  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style-type: none;
  }

  li nav {
    margin-left: 1rem;
  }

  a {
    display: block;
    text-decoration: none;
    color: black;
    padding: 0.55rem;
    transition: 0.1s background ease-out;

    &.active,
    &:hover {
      background-color: lightblue;
    }
  }
`;

export default function Sidebar() {
  const router = useRouter();
  return (
    <StyledSidebar>
      <StyledNav>
        <ul>
          <li>
            <Link href="/">
              <a className={router.pathname == "/" ? "active" : ""}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/star-wars">
              <a className={router.pathname == "/star-wars" ? "active" : ""}>
                Star Wars
              </a>
            </Link>
            <StyledNav>
              <ul>
                <li>
                  <Link href="/characters">
                    <a
                      className={
                        router.pathname.startsWith("/characters")
                          ? "active"
                          : ""
                      }
                    >
                      Characters
                    </a>
                  </Link>
                </li>
              </ul>
            </StyledNav>
          </li>
        </ul>
      </StyledNav>
    </StyledSidebar>
  );
}
