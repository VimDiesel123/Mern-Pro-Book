import React from 'react';
import {
  Navbar, NavItem, Nav, Glyphicon, OverlayTrigger, NavDropdown, MenuItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Contents from './Contents.jsx';

function NavBar() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>Issue Tracker</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem>Home</NavItem>
        <NavItem>Issue List</NavItem>
        <NavItem>Report</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem>
          <OverlayTrigger>
            <Glyphicon glyph="plus" />
          </OverlayTrigger>
        </NavItem>
        <NavDropdown
          id="user-dropdown"
          title={<Glyphicon glyph="option-vertical" />}
          noCaret
        >
          <MenuItem>About</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}
