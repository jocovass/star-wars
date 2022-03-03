import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useRandomQuote } from "../../../hooks/useRandomQuote";
import Loader from "../../../components/loader";
import BreadCrumbs from "../../../components/breadCrumbs";

const QUERY_CHARACTER = gql`
  query ($charId: ID!) {
    person(id: $charId) {
      name
      eyeColor
      gender
      filmConnection {
        edges {
          node {
            title
            episodeID
            director
            producers
            releaseDate
          }
        }
      }
    }
  }
`;

const StyledCard = styled.div`
  padding: 1rem;
  border-radius: 5px;
  background-color: #d5f3fe;
  margin: 0 2% 2rem;
  flex-basis: 100%;
  position: relative;
  z-index: 5;

  @media only screen and (min-width: 750px) {
    flex-basis: 46%;
  }

  @media only screen and (min-width: 1300px) {
    flex-basis: 29.33%;
  }

  .film-title {
    text-align: center;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    z-index: -1;
    opacity: 1;
    box-shadow: 5px 20px 20px rgba(0, 0, 0, 0.15);
    transition: opacity 0.35s ease-out;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    z-index: -1;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.35s ease-out;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 0;
  }
`;

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const MainContent = styled.div`
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }

  blockquote {
    display: block;
    max-width: 360px;
    margin: 1rem auto 2rem;
    text-align: center;
  }
`;

export default function Character({ params }) {
  const quote = useRandomQuote();
  const { loading, data } = useQuery(QUERY_CHARACTER, {
    variables: { charId: params.id },
  });

  if (loading) return <Loader />;

  if (data)
    return (
      <MainContent>
        <BreadCrumbs />
        <h2 className="title">{data.person.name}</h2>
        {quote ? (
          <blockquote>
            <q>{quote.content}</q>
          </blockquote>
        ) : null}
        <Results>
          {data.person.filmConnection.edges.map((film, idx) => {
            return (
              <StyledCard key={idx}>
                <h3 className="film-title">{film.node.title}</h3>
                <p className="episode">Episode: {film.node.episodeID}</p>
                <p className="director">Director: {film.node.director}</p>
                <p className="date">Release Date: {film.node.releaseDate}</p>
                <p className="producers">
                  Producers:{" "}
                  {Array.isArray(film.node.producers) &&
                    film.node.producers
                      .map((prod, idx) => {
                        return prod;
                      })
                      .join(", ")}
                </p>
              </StyledCard>
            );
          })}
        </Results>
      </MainContent>
    );

  return <p>error</p>;
}

export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}
