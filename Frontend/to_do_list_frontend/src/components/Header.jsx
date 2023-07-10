import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentUser } from "../store/actions/user";
import { Role } from "../models/role";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate("/login");
    };
    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/list/add-list">
                        Add List
                    </Navbar.Brand>
                    
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <Link className="nav-link" onClick={() => logout()}>
                                Sign Out
                            </Link>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
}
export default Header;