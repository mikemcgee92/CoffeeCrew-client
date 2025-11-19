/* eslint-disable jsx-a11y/anchor-is-valid */

import firebase from 'firebase/app';
import 'firebase/auth';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import getUserInfo from '../utils/data/userinfo_data';

export default function NavBar() {
  const auth = firebase.auth();
  const user = auth.currentUser;
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo(user.uid).then(setUserInfo);
  }, [user.uid]);

  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          CoffeeCrew
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" href="/">
              Categories
            </Link>
            <Link className="nav-link" href="/recipes">
              All Recipes
            </Link>
            <Link className="nav-link" href="/ticketrail">
              Ticket Rail
            </Link>
            {userInfo.is_manager ? (
              <Link className="nav-link" href="/ingredients">
                ingredients
              </Link>
            ) : (
              ''
            )}
          </Nav>

          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
