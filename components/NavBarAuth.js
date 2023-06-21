/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  const [filter, setFilter] = useState('');
  const router = useRouter();

  const onSearch = (event) => {
    event.preventDefault();
    if (filter !== '') {
      router.push(`/search/${filter}`);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Character Tracker</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* <Nav className="me-auto"> */}
          {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
          <Link passHref href="/">
            <Nav.Link>Home</Nav.Link>
          </Link>
          <Nav className="ml-auto">
            <input placeholder="Let's Search" onChange={(event) => setFilter(event.target.value)} />

            <button type="submit" onClick={(event) => onSearch(event)}>Search</button>
            <Button variant="dark" onClick={signOut}>Sign Out</Button>
            {/* </Nav> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
