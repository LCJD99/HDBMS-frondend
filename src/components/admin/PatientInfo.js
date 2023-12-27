import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const EditableTable = ({ rows }) => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRows, setEditedRows] = useState({});

  const handleEditClick = (rowId) => {
    setEditingRowId(rowId);
    setEditedRows((prevEditedRows) => ({
      ...prevEditedRows,
      [rowId]: { ...rows.find((row) => row.id === rowId) },
    }));
  };

  const handleSaveClick = (rowId) => {
    // 在这里处理保存逻辑，比如更新 state 或调用 API
    console.log(`Save clicked for row with id ${rowId}`);
    setEditingRowId(null);
  };

  const handleInputChange = (rowId, field, value) => {
    setEditedRows((prevEditedRows) => ({
      ...prevEditedRows,
      [rowId]: {
        ...prevEditedRows[rowId],
        [field]: value,
      },
    }));
  };

  return (
    <Table size="large">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              {editingRowId === row.id ? (
                <input
                  type="text"
                  value={editedRows[row.id]?.date || row.date}
                  onChange={(e) => handleInputChange(row.id, 'date', e.target.value)}
                />
              ) : (
                row.date
              )}
            </TableCell>
            <TableCell>
              {editingRowId === row.id ? (
                <IconButton onClick={() => handleSaveClick(row.id)}>
                  <SaveIcon />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleEditClick(row.id)}>
                  <EditIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default EditableTable;



