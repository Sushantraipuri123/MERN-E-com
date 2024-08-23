import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Account.css";
import { useAuth } from "../../store/Auth";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Link } from "react-router-dom";

function Account() {
  const { user } = useAuth();
  const userdata = user?.userData;
  const role = userdata?.role;
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  const { isLoggedin } = useAuth();
  console.log(`user role ${role}`);

  const handleMenuItemClick = (popupState, item) => {
    setSelectedMenuItem(item); // Update the selected menu item
    popupState.close(); // Close the menu after selection
  };
  return (
    <>
      <div className="container-fluid bg-hero-sections">
        <div>
          <h6 className="text-center mt-5">HOME - Account</h6>
          <h1 className="text-center text-white">Account</h1>
        </div>
      </div>
      <div>
        <div className="container mt-5 pt-lg-3 mb-5">
          {isLoggedin ? ( // Check if the user is logged in
            <>
             <div className="d-flex gap-3 flex-wrap justify-content-center align-items-end">
             <p className="display-6 text-center text-muted Urbanist">
                Welcome
              </p>
              <h2 className="text-capitalize text-center Urbanist display-4">
                {userdata?.name}...!  
              </h2>
             </div>
              <div className="d-flex justify-content-between mt-5">
                <div>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <React.Fragment>
                        <Button
                          variant="contained"
                          {...bindTrigger(popupState)}
                        >
                          {selectedMenuItem} {/* Display the selected item */}
                        </Button>
                        <Menu {...bindMenu(popupState)} className="mt-1">
                          <MenuItem
                             className="text-secondary"
                             as={Link}
                             to="/account"
                            onClick={() =>
                              handleMenuItemClick(popupState, "Dashboard")
                            }
                          >
                            Dashboard
                          </MenuItem>

                          {role === "seller" ? (
                            <>
                              <MenuItem
                                className="text-secondary"
                                as={Link}
                                to="/account/add-products"
                                onClick={() =>
                                  handleMenuItemClick(
                                    popupState,
                                    "Add Products"
                                  )
                                }
                              >
                                Add Products
                              </MenuItem>
                              <MenuItem
                                className="text-secondary"
                                as={Link}
                                to="/account/my-products"
                                onClick={() =>
                                  handleMenuItemClick(popupState, "My Products")
                                }
                              >
                                My Products
                              </MenuItem>
                              <MenuItem
                                className="text-secondary"
                                as={Link}
                                to="/account/delivered-orders"
                                onClick={() =>
                                  handleMenuItemClick(
                                    popupState,
                                    "Delivered Orders"
                                  )
                                }
                              >
                                Delivered Orders
                              </MenuItem>
                              <MenuItem
                                className="text-secondary"
                                as={Link}
                                to="/account/received-orders"
                                onClick={() =>
                                  handleMenuItemClick(
                                    popupState,
                                    "Received Orders"
                                  )
                                }
                              >
                                Received Orders
                              </MenuItem>
                            </>
                          ) : null}

                          <MenuItem
                            as={Link}
                            className="text-secondary"
                            to="/account/my-orders"
                            onClick={() =>
                              handleMenuItemClick(popupState, "My Orders")
                            }
                          >
                            My Orders
                          </MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </PopupState>
                </div>
                <div>
                  <Link to="/account/logout">
                    <Button variant="contained">Logout</Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-muted Urbanist">
              Please log in to access your account.
            </p>
          )}
        </div>

        {/* Nested routes will render here */}
        <Outlet />
      </div>
    </>
  );
}

export default Account;
