import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "Black",
  },
}));

export default function Navbar() {
  const [noOfprods, setnoOfprods] = useState([]);
  const classes = useStyles();
  function getNoOfFavsProd() {
    const arr = localStorage
      .getItem("removedDublicatedWislistedProducts")
      .split(",");
    arr.splice(0, 1);
    setnoOfprods(arr);
  }
  useEffect(() => {
    getNoOfFavsProd();
  }, []);
  return (
    <div className={classes.root}>
      <AppBar color="inherit" position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            E-Commerce
          </Typography>
          <NavLink
            exact
            to={"/"}
            style={{ color: "Black", paddingRight: "10px" }}
          >
            <Button color="inherit" variant="contained">
              Home
            </Button>
          </NavLink>
          <NavLink
            exact
            to={"/products/wishlisted"}
            style={{ color: "Black", paddingRight: "10px" }}
          >
            <Button color="inherit" variant="contained">
              Wishlist{" "}
              <span className="noOfWislistItems">{noOfprods.length}</span>
            </Button>
          </NavLink>

          <NavLink
            exact
            to={"/cart"}
            style={{ color: "Black", paddingRight: "10px" }}
          >
            <Button color="inherit" variant="contained">
              Cart
            </Button>
          </NavLink>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
