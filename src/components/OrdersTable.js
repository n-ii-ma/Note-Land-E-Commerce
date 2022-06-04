import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import { getOrderDetails, selectOrders } from "../features/orders/ordersSlice";
import OrderDetailsTable from "./OrderDetailsTable";

// Change MUI breakpoint
const theme = createTheme({
  breakpoints: {
    values: {
      md: 715,
    },
  },
});

const OrdersTable = () => {
  // Orders state
  const orders = useSelector(selectOrders);

  // Dialog state
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  // Handle getting the order details
  const handleOrderDetails = (id) => {
    dispatch(getOrderDetails(id));
    setOpen(true);
  };

  // Order history columns
  const columns = [
    {
      field: "order_number",
      headerName: "Order Number",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "total_price",
      headerName: "Total Price",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      type: "dateTime",
      width: 200,
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "details",
      headerName: "Order Details",
      headerAlign: "center",
      align: "center",
      width: 120,
      renderCell: (params) => (
        <Button
          onClick={() => handleOrderDetails(params.id)}
          variant="contained"
          color="info"
          size="small"
        >
          Details
        </Button>
      ),
    },
  ];

  // Order history rows
  const rows = orders.map((order) => ({
    id: order.order_id,
    order_number: order.order_number,
    total_price: `$${order.total_price}`,
    status: order.status,
    date: order.created_at,
  }));

  return (
    <Box>
      <DataGrid
        autoHeight
        autoPageSize
        disableSelectionOnClick
        aria-label="order history"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          bgcolor: "#f7f7f7",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within":
            {
              outline: "none",
            },
        }}
      />
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
          aria-labelledby="order details dialog"
          aria-describedby="order details description dialog"
        >
          <OrderDetailsTable />
          <DialogActions>
            <Button onClick={() => setOpen(false)} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </Box>
  );
};

export default OrdersTable;
