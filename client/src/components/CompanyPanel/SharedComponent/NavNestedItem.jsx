import React from "react";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { camelize } from '../../../helper/helper';
import { useTranslation } from 'react-i18next'
import { NavLink, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles((theme) => ({


  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  routelink: {
    textDecoration: "none",
    color: "inherit",
  },
  name: {
    paddingLeft: "3px",
  },
}));
export default function NavNestedItem(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  let { path, url } = useRouteMatch();
  const [openItem, setOpenItem] = React.useState(false);
  const handleClick = () => {
    setOpenItem(!openItem);
  };


  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
        <i className={props.item.icon} ></i>
          {/* <EuroSymbolIcon /> */}
        </ListItemIcon>
        <ListItemText primary={t(`${camelize(props.item.name.toLowerCase())}`)}/>

        {openItem ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openItem} timeout="auto" unmountOnExit>

        <List component="div" disablePadding>
          {props.item.children.map((item, index) => {
            return (
              <NavLink activeStyle={{ color: 'red' }} to={`${url}${item.url}`} key={index} className={classes.routelink} >
                <ListItem
                  button className={classes.nested}>
                  <ListItemIcon>
                  <i className={item.icon} ></i>
                  </ListItemIcon>
                  <ListItemText primary={t(`${camelize(item.name.toLowerCase())}`)}/>

                
                </ListItem>
              </NavLink>);
          })}


        </List>

      </Collapse>
    </div>
  )
}