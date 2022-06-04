import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { selectOrderDetails } from "../features/orders/ordersSlice";

const OrderDetailsTable = () => {
  // Order details state
  const orderDetails = useSelector(selectOrderDetails);

  // Order details columns
  const columns = [
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      width: 225,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      type: "number",
      width: 100,
    },
    {
      field: "color",
      headerName: "Color",
      headerAlign: "center",
      align: "center",
      width: 140,
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      width: 120,
    },
    {
      field: "buyAgain",
      headerName: "Buy Again",
      headerAlign: "center",
      align: "center",
      width: 120,
      renderCell: (params) => (
        <Button
          LinkComponent={Link}
          to={`/product/${params.id}`}
          variant="contained"
          size="small"
        >
          Buy Again
        </Button>
      ),
    },
  ];

  // Order details rows
  const rows = orderDetails.map((product) => ({
    id: product.product_id,
    name: product.name,
    quantity: product.quantity,
    color: product.color,
    price: `$${product.price}`,
  }));

  return (
    <Box>
      <DataGrid
        autoHeight
        autoPageSize
        disableSelectionOnClick
        hideFooter
        aria-label="order details"
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sx={{
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within":
            {
              outline: "none",
            },
        }}
      />
    </Box>
  );
};

export default OrderDetailsTable;
