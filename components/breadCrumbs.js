import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";

const StyledBreadCrumbs = styled.div`
  padding: 1rem 0 0;

  ul {
    display: flex;
    align-items: center;
  }

  li {
    list-style-type: none;
    padding: 0 0.4rem;
    line-height: 10px;

    &.active {
      color: #3c9dbc;
    }

    &:not(:first-of-type) {
      border-left: 1px solid black;
    }

    &:first-of-type {
      padding-left: 0;
    }
  }

  a {
    color: black;
    transition: color 0.1s ease-out;
    text-decoration: none;

    &:hover {
      color: #3c9dbc;
    }
  }
`;

export default function BreadCrumbs() {
  const router = useRouter();
  function getBreadCrumbs() {
    const arr = router.pathname.split("/");
    let path = ``;
    return arr.reduce((acc, item) => {
      if (!item) return acc;
      if (item.startsWith("[")) {
        const link = item.slice(1, item.length - 1);
        path += `/${router.query[link]}/${router.query.id}`;
        if (link === "id") return acc;
        const crumb = {
          label: router.query[link],
          path,
        };
        acc.push(crumb);
      } else {
        path += `/${item}`;
        const crumb = {
          label: `${item[0].toUpperCase()}${item.slice(1)}`,
          path,
        };
        acc.push(crumb);
        // acc.push(item);
      }
      return acc;
    }, []);
  }

  const breadCrumbs = getBreadCrumbs();
  return (
    <StyledBreadCrumbs>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {breadCrumbs.map((item, idx) => {
            if (idx === breadCrumbs.length - 1) {
              return (
                <li key={item.label + idx} className="active">
                  {item.label}
                </li>
              );
            }

            return (
              <li key={item.label + idx}>
                <Link href={`${item.path}`}>
                  <a>{item.label}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </StyledBreadCrumbs>
  );
}
