import { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const rows = [
  {
    key: 1,
    name: "John Doe",
    width: 50,
  },
  {
    key: 2,
    name: "Jane Doe",
    width: 50,
  },
  {
    key: 3,
    name: "Bob",
    width: 50,
  },
  {
    key: 4,
    name: "Smith",
    width: 50,
  },
  {
    key: 5,
    name: "BZ",
    width: 50,
  },
  {
    key: 6,
    name: "Bob S",
    width: 50,
  },
  {
    key: 7,
    name: "S",
    width: 50,
  },
];

const columns = [
  {
    field: "key",
    isEditable: false,
    headerName: "Field",
    width: 70,
  },
  {
    field: "name",
    isEditable: true,
    headerName: "Value",
    width: 130,
  },
];

const EditableTableCell = () => {
  const [data, setData] = useState(rows);
  const [editCellId, setEditCellId] = useState(null);

  const inputRef = useRef(null);

  const handleCellClick = (event, cellId) => {
    const columnId = event.currentTarget.dataset.columnId;
    const isEditable = columns.find(
      (column) => column.field === columnId,
    ).isEditable;
    if (isEditable) {
      setEditCellId(cellId);
    }
  };

  const handleInputChange = (event, cellId) => {
    const { value } = event.target;
    const newData = [...data];
    const rowIndex = newData.findIndex((row) => row.key === cellId);
    newData[rowIndex] = {
      ...newData[rowIndex],
      [editCellId]: value,
    };
    setData(newData);
  };

  const handleInputBlur = () => {
    setEditCellId(null);
  };

  useEffect(() => {
    if (editCellId !== null) {
      inputRef.current.focus();
    }
  }, [editCellId]);

  const renderCell = (row, column) => {
    const cellValue = row[column.field];
    const isEditable = editCellId === row.key && column.isEditable;

    return (
      <TableCell
        key={column.field}
        data-column-id={column.field}
        onClick={(event) => handleCellClick(event, row.key)}
        sx={{ py: 0, height: 62 }}
      >
        {isEditable ? (
          <TextField
            variant="outlined"
            sx={{
              width: row[column.width],
              height: "100%",
              justifyContent: "center",
            }}
            size="small"
            inputRef={inputRef}
            value={cellValue}
            onChange={(event) => handleInputChange(event, row.key)}
            onBlur={handleInputBlur}
          />
        ) : (
          <TableRow>{cellValue}</TableRow>
        )}
      </TableCell>
    );
  };

  return (
    <TableContainer sx={{ height: 250 }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={{ width: column.width }} key={column.field}>
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.key}>
              {columns.map((column) => renderCell(row, column))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditableTableCell;
