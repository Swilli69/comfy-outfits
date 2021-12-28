import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, NavLink as RRNavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import User from "./components/User/User";
import Shop from "./components/Shop/Shop";
import ShopItem from "./components/ShopItem/ShopItem";
import { Home } from "./components/Home";
import NotFound from "./components/NotFound";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

import './App.css'

import { Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, Collapse, NavLink, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from "reactstrap";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './utils/history';
import EventBus from "./common/EventBus";

export default function App() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const { user } = useSelector(state => ({
        user: state.auth.user,
    }), shallowEqual)

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage());
        });

        EventBus.on("logout", () => {
            dispatch(logout());
        });

        return () => { EventBus.remove("logout"); }
    }, [dispatch])

    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <Router history={history}>
            <div>
                <Navbar
                    color="dark"
                    dark
                    expand="md"
                    light
                >
                    <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            {user ? (
                                <><NavItem>
                                    <NavLink tag={RRNavLink} exact to="/profile">{t("Profile")}</NavLink>
                                </NavItem>
                                    {user.role === "Admin" &&
                                        <NavItem>
                                            <NavLink tag={RRNavLink} exact to="/users">{t("Users")}</NavLink>
                                        </NavItem>
                                    }
                                    {user.role === "ShopOwner" &&
                                        <NavItem>
                                            <NavLink tag={RRNavLink} exact to="/shops">{t("shops")}</NavLink>
                                        </NavItem>
                                    }
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={logOut}>
                                            {t("LogOut")}
                                        </a>
                                    </li></>
                            ) : (
                                <>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} exact to="/login">{t("Login")}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} exact to="/register">{t("SignUp")}</NavLink>
                                    </NavItem>
                                </>
                            )}
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    {i18n.language.toUpperCase()}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem onClick={() => i18n.changeLanguage("ua")}>
                                        UA
                                    </DropdownItem>
                                    <DropdownItem onClick={() => i18n.changeLanguage("en")}>
                                        EN
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                    <NavbarBrand tag={RRNavLink} exact to="/">
                        Comfy outfits
                    </NavbarBrand>
                </Navbar>

                <div className="mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <PrivateRoute exact path="/users" component={User} roles={["Admin"]} />
                        <PrivateRoute exact path="/shops" component={Shop} roles={["ShopOwner"]} />
                        <PrivateRoute exact path="/shopItems/:id" component={ShopItem} roles={["ShopOwner"]} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <Route exact path="/404" component={NotFound} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

