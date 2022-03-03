import React from "react";
import styled from "@emotion/styled";
import { useTable, useSortBy } from "react-table";
import Link from "next/link";

const StyledDiv = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;
    width: 100%;
    text-align: center;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    a {
      color: black;
      display: block;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .pagination {
    margin: 1rem auto;
    text-align: center;

    button {
      cursor: pointer;
      margin: 0 0.2rem;
    }

    select {
      margin-left: 2rem;
    }
  }
`;

export default function Table({
  data,
  loadData,
  pageInfo,
  charPerPage,
  setCharPerPage,
}) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Hair Color",
        accessor: "hairColor",
      },
      {
        Header: "Skin Color",
        accessor: "skinColor",
      },
      {
        Header: "Eye Color",
        accessor: "eyeColor",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Home World Name",
        accessor: "homeworld",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <StyledDiv>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr key={`thead-tr-${idx}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <th
                  key={`thead-th-${idx}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr key={`tbody-tr-${idx}`} {...row.getRowProps()}>
                {row.cells.map((cell, idx) => {
                  return (
                    <td key={`tbody-td-${idx}`} {...cell.getCellProps()}>
                      {cell.column.Header === "Name" ? (
                        <Link
                          href={`/characters/${cell.row.original.name}/${cell.row.original.id}`}
                        >
                          <a>{cell.render("Cell")}</a>
                        </Link>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => loadData({ variables: { first: charPerPage } })}>
          {"<<"}
        </button>
        <button
          onClick={() =>
            loadData({
              variables: {
                first: charPerPage,
                before: pageInfo.startCursor,
              },
            })
          }
        >
          {"<"}
        </button>

        <button
          onClick={() =>
            loadData({
              variables: {
                first: charPerPage,
                after: pageInfo.endCursor,
              },
            })
          }
        >
          {">"}
        </button>
        <button onClick={() => loadData({ variables: { last: charPerPage } })}>
          {">>"}
        </button>

        <select
          value={charPerPage}
          onChange={(e) => {
            setCharPerPage(Number(e.target.value));
          }}
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </StyledDiv>
  );
}
