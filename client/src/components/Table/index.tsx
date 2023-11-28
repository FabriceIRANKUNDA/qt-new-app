import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";

export default function TableComponent(props: any) {
  const {
    rows,
    columns,
    count,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    rowClickedHandler,
  } = props;

  return (
    <>
      {rows?.length > 0 && (
        <>
          <TableContainer component={Paper}>
            <Table size="medium" aria-label="simple table">
              <TableHead>
                <TableRow style={{ height: "45px" }}>
                  <TableCell
                    align={"left"}
                    style={{ padding: "0px 1rem !important" }}
                  ></TableCell>
                  {columns.map((column: any, index: number) => (
                    <TableCell
                      key={index}
                      align={column.align}
                      style={{
                        fontWeight: "bold",
                        visibility:
                          props.hideColumn && column.label !== "No"
                            ? "hidden"
                            : "visible",
                        padding: "0px 1rem !important",
                      }}
                    >
                      {props.hideColumn && column.label === "No"
                        ? ""
                        : column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any, index: number) => (
                  <TableRow
                    style={{
                      height: "44px",
                      background: `${index % 2 == 0 ? "#f5faff" : "white"}`,
                    }}
                    key={index}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align={"left"}
                      style={{
                        padding: "0px 1rem !important",
                        lineHeight: "0",
                      }}
                    >
                      {index + 1}
                    </TableCell>
                    {columns.map((column: any, index: number) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={index}
                          style={{
                            padding: "0px 1rem !important",
                            lineHeight: "0",
                            fontSize: "0.85rem",
                          }}
                          align={column.align}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </>
      )}
    </>
  );
}
