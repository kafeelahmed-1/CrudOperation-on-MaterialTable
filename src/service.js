import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  TextField,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import "./style.css";
const CustomTable = () => {
  // Initial rows state
  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Ahmed",
      age: 25,
      city: "Islamabad",
      phone: "03001234567",
      email: "ahmed@example.com",
    },
    {
      id: 2,
      name: "Ali",
      age: 23,
      city: "Lahore",
      phone: "03012345678",
      email: "ali@example.com",
    },
    {
      id: 3,
      name: "Huraira",
      age: 21,
      city: "Karachi",
      phone: "03022345678",
      email: "huraira@example.com",
    },
    {
      id: 4,
      name: "Asad",
      age: 44,
      city: "Islamabad",
      phone: "03032345678",
      email: "asad@example.com",
    },
    {
      id: 5,
      name: "Hamza",
      age: 48,
      city: "Abbotabad",
      phone: "03042345678",
      email: "hamza@example.com",
    },
    {
      id: 6,
      name: "Huzaifa",
      age: 34,
      city: "Mansehra",
      phone: "03052345678",
      email: "huzaifa@example.com",
    },
    {
      id: 7,
      name: "Ibrahim",
      age: 54,
      city: "Murree",
      phone: "03062345678",
      email: "ibrahim@example.com",
    },
    {
      id: 8,
      name: "Saad",
      age: 45,
      city: "Kashmir",
      phone: "03072345678",
      email: "saad@example.com",
    },
    {
      id: 9,
      name: "Talha",
      age: 66,
      city: "Khanewal",
      phone: "03082345678",
      email: "talha@example.com",
    },
    {
      id: 10,
      name: "Umer",
      age: 22,
      city: "Muzaffarabad",
      phone: "03092345678",
      email: "umer@example.com",
    },
  ]);

  // State for tracking which row is being edited
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingRowData, setEditingRowData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle row deletion
  const handleDelete = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  // Function to handle row editing
  const handleEdit = (id) => {
    const rowData = rows.find((row) => row.id === id);
    setEditingRowId(id);
    setEditingRowData(rowData);
  };

  // Function to handle saving the edited row
  const handleSave = () => {
    setRows(
      rows.map((row) => (row.id === editingRowId ? editingRowData : row))
    );
    setEditingRowId(null);
    setEditingRowData({});
  };

  // Function to handle adding a new row
  const handleAdd = () => {
    const newId = rows.length ? rows[rows.length - 1].id + 1 : 1;
    const newRow = {
      id: newId,
      name: "New User",
      age: 0,
      city: "New City",
      phone: "0000000000",
      email: "newuser@example.com",
    };
    setRows([...rows, newRow]);
  };

  // Filter rows based on search term
  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define columns with actions
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150, editable: true },
    { field: "age", headerName: "Age", width: 100, editable: true },
    { field: "city", headerName: "City", width: 150, editable: true },
    { field: "phone", headerName: "Phone", width: 150, editable: true },
    { field: "email", headerName: "Email", width: 200, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: "70px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="16px"
      >
        <h2 style={{ margin: 0 }}>User Details</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <IconButton position="start">
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <IconButton
            color="primary"
            onClick={handleAdd}
            style={{ marginLeft: "8px" }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </Box>
      <div style={{ height: 450, width: "100%", border: "1px solid #ccc" }}>
        <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
      </div>

      {/* Dialog for editing a row */}
      {editingRowId && (
        <Dialog open={true} onClose={() => setEditingRowId(null)}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              value={editingRowData.name}
              onChange={(e) =>
                setEditingRowData({ ...editingRowData, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Age"
              fullWidth
              variant="outlined"
              type="number"
              value={editingRowData.age}
              onChange={(e) =>
                setEditingRowData({ ...editingRowData, age: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="City"
              fullWidth
              variant="outlined"
              value={editingRowData.city}
              onChange={(e) =>
                setEditingRowData({ ...editingRowData, city: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Phone"
              fullWidth
              variant="outlined"
              value={editingRowData.phone}
              onChange={(e) =>
                setEditingRowData({ ...editingRowData, phone: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              variant="outlined"
              value={editingRowData.email}
              onChange={(e) =>
                setEditingRowData({ ...editingRowData, email: e.target.value })
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingRowId(null)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CustomTable;
