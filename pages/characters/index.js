import React from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";
import styled from "@emotion/styled";
import Head from "next/head";
import Loader from "../../components/loader";
import Table from "../../components/table";
import { useRandomQuote } from "../../hooks/useRandomQuote";
import BreadCrumbs from "../../components/breadCrumbs";

const QUERY_CHARACTERS = gql`
  query ($first: Int, $after: String, $before: String, $last: Int) {
    allPeople(first: $first, last: $last, after: $after, before: $before) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          name
          hairColor
          skinColor
          eyeColor
          gender
          homeworld {
            name
          }
          id
        }
      }
    }
  }
`;

const StyledPage = styled.section`
  h1 {
    text-align: center;
    margin-top: 2rem;
  }

  blockquote {
    display: block;
    max-width: 360px;
    margin: 1rem auto;
    text-align: center;
  }
`;

function formatTableData(data) {
  return data.reduce((acc, item) => {
    const row = {
      ...item.node,
      homeworld: item.node.homeworld.name,
      cursor: item.cursor,
    };

    acc.push(row);
    return acc;
  }, []);
}

export default function Home() {
  const quote = useRandomQuote();
  const [charPerPage, setCharPerPage] = React.useState(5);
  const [loadData, { loading, data, error }] = useLazyQuery(QUERY_CHARACTERS, {
    notifyOnNetworkStatusChange: true,
  });

  React.useEffect(() => {
    loadData({ variables: { first: charPerPage } });
  }, [charPerPage, loadData]);

  return (
    <StyledPage>
      <Head>
        <title>Characters</title>
        <meta name="description" content="List of Star Wars characters" />
      </Head>
      <BreadCrumbs />

      <h1>Characters</h1>

      {quote ? (
        <blockquote>
          <q>{quote.content}</q>
        </blockquote>
      ) : null}
      {error ? (
        <p>error</p>
      ) : loading || !data ? (
        <Loader />
      ) : (
        <Table
          data={formatTableData(data.allPeople.edges)}
          charPerPage={charPerPage}
          loadData={loadData}
          setCharPerPage={setCharPerPage}
          pageInfo={data.allPeople.pageInfo}
        />
      )}
    </StyledPage>
  );
}
