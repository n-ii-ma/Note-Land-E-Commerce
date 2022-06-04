import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {
  getUser,
  selectUser,
  selectLoadingUsers,
  selectErrorUsers,
} from "../features/users/usersSlice";
import {
  getOrders,
  selectOrders,
  selectLoadingOrders,
  selectErrorOrders,
} from "../features/orders/ordersSlice";
import Profile from "./Profile";
import OrdersTable from "./OrdersTable";
import PrivateInfo from "./PrivateInfo";
import Address from "./Address";
import Spinner from "./Spinner";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Dashboard = () => {
  // Tab state
  const [value, setValue] = useState(0);

  // Users state
  const user = useSelector(selectUser);
  const loadingUsers = useSelector(selectLoadingUsers);
  const errorUsers = useSelector(selectErrorUsers);

  // Orders state
  const orders = useSelector(selectOrders);
  const loadingOrders = useSelector(selectLoadingOrders);
  const errorOrders = useSelector(selectErrorOrders);

  const dispatch = useDispatch();

  // Get user and orders data
  useEffect(() => {
    dispatch(getUser(user.user.user_id));
    dispatch(getOrders(user.user.user_id));
  }, [dispatch, user]);

  // Change tabs
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box marginTop={{ xs: "6em", sm: "7em" }}>
      <Container maxWidth="md">
        <Card
          raised
          sx={{
            margin: "0 auto",
            padding: "0.75em",
            backgroundColor: "#DACDCA",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                aria-label="dashboard tabs"
              >
                <Tab label="Profile" />
                <Tab label="Orders" />
                <Tab label="Edit Info" />
                <Tab label="Edit Address" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {loadingUsers || errorUsers ? <Spinner /> : <Profile />}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {loadingOrders || errorOrders ? (
                <Spinner />
              ) : !orders?.length ? (
                <Typography
                  align="center"
                  variant="h5"
                  component="h5"
                  sx={{
                    fontSize: { xs: "1.05rem", md: "1.25rem" },
                  }}
                >
                  Order Record Is Empty
                </Typography>
              ) : (
                <OrdersTable />
              )}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {loadingUsers || errorUsers ? <Spinner /> : <PrivateInfo />}
            </TabPanel>
            <TabPanel value={value} index={3}>
              {loadingUsers || errorUsers ? <Spinner /> : <Address />}
            </TabPanel>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;
