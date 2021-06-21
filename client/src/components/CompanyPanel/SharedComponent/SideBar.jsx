import React, { useEffect, useContext } from "react";
import clsx from "clsx";
import "./style.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useRouteMatch, useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FooterContent from '../../FooterContent/FooterContent';
// import Logo from '../../../assets/images/option 1.png';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import NavNestedItem from './NavNestedItem';
import { loadSideBar } from "../../../api/api";
import CompanyContext from '../../../context/CompanyContext';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import NotificationList from './NotificationList';
// import { getNotifications } from '../../../api/api'
import { useTranslation } from 'react-i18next';

const drawerWidth = 270;

const useStyles = makeStyles((theme) => ({
  isActive: {
    color: "red",
  },

  title: {
    backgroundColor: "transparent",
    flexGrow: 1,
  },
  root: {
    display: "flex",
  },

  appBar: {
    color: "#878793",
    backgroundColor: "#fff",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    padding: "2px",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  bg: {
    display: "flex",
    padding: "7px",
  },
  menuButton: {
    color: "#ff6877",
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
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
    padding: theme.spacing(2),
    overflowY: 'hidden'
  },
  routelink: {
    textDecoration: "none",
    color: "inherit",
  },
  name: {
    paddingLeft: "3px",
  },
}));

const LOGO = styled.img`
display:block;
height:auto;
max-width:150px;
max-height: 51px;
`;
const LogoWraper = styled.div`
flex:2;
display:flex;
justify-content:center;
`;

export default function MiniDrawer(props) {
  const { t } = useTranslation();
  const classes = useStyles();
  const company = useContext(CompanyContext);
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(true);
  const [menuItem, setMenuItem] = React.useState([]);
  const [notifications, setNotification] = React.useState([]);

  let { path, url } = useRouteMatch();

  let data = JSON.parse(localStorage.getItem('auth_user'));
  const name = data.user.name || 'User';
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorNotifi, setAnchorNotifi] = React.useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const openNotification = (event) => {
    setAnchorNotifi(event.currentTarget);
  }

  const closeNotification = (event) => {
    setAnchorNotifi(null);
  }

  const logout = () => {
    localStorage.removeItem('auth_user')
    handleClose();
    history.push('/login')
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const sideBar = () => {
    loadSideBar().then((res) => {
      // console.log(res.data);
      setMenuItem([...res.data.items])
      // console.log(res);
    })
      .catch((err) => {
        // console.log(err)
      })
  };
  // const getnotifications = () => {
  //   getNotifications()
  //     .then(res => {
  //       setNotification([...res.data.notifications])
  //     })
  //     .catch(err => console.log(err));
  // }
  useEffect(() => {
    sideBar();
    // getnotifications();
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* ToolBar */}

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>

          </Typography>


          <div>
            <IconButton
              aria-label="notifications of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={openNotification}
            >
              <Badge badgeContent={notifications.length} color="secondary">
                <NotificationsIcon />
              </Badge>

            </IconButton>

            <Menu
              id="notification-menu"
              anchorEl={anchorNotifi}
              keepMounted
              open={Boolean(anchorNotifi)}
              onClose={closeNotification}
              style={{ maxWidth: "300px", minWidth: "300px", width: '100%' }}
            >

              {/* <NotificationList readNotification={() => getnotifications()} notifications={notifications} /> */}

            </Menu>



            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
              onClick={openMenu}
            >
              <AccountCircle />
              <Typography className={classes.name}>{name}</Typography>
            </IconButton>


            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link to={`${url}/settings`}> <MenuItem onClick={handleClose}>{t('setting')}</MenuItem></Link>
              <Link to={`${url}/change-password`}><MenuItem onClick={handleClose}>{t('changePassword')}</MenuItem></Link>
              <Link to={`/login`}> <MenuItem onClick={(e) => logout(e)}  >{t('logout')}</MenuItem></Link>
            </Menu>

          </div>
        </Toolbar>
      </AppBar>

      {/* ToolBar */}

      <Drawer

        variant={"permanent"}

        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })
        }
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar, classes.bg}>
          <LogoWraper>
            <LOGO className="text-center" src={`/public/images/company/${company.logo}`} alt="LOGO" />
          </LogoWraper>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        {/* navigation list */}

        <List component="nav" aria-labelledby="nested-list-subheader">
          {
            menuItem.map((item, index) => (item.children && item.children.length > 0) ? <NavNestedItem item={item} key={index} /> : <NavItem item={item} key={index} />)
          }

        </List>




        <FooterContent />
        {/* navigation List */}
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div >
  );
}
