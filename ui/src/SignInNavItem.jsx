import React from 'react';
import {
  MenuItem, NavDropdown, Modal, Button, NavItem,
} from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

export default class SignInNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      user: { signedIn: false, givenName: '' },
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  componentDidMount() {
    const clientId = window.ENV.GOOGLE_CLIENT_ID;
    if (!clientId) return;
    const initClient = () => {
      gapi.client.init({
        clientId,
        scope: '',
      });
    };

    gapi.load('client:auth2', initClient);
  }

  signIn() {
    this.hideModal();
    this.setState({ user: { signedIn: true, givenName: 'User1' } });
  }

  signOut() {
    this.setState({ user: { signedIn: false, givenName: '' } });
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  render() {
    const clientID = window.ENV.GOOGLE_CLIENT_ID;
    const { user } = this.state;
    if (user.signedIn) {
      return (
        <NavDropdown title={user.givenName} id="user">
          <MenuItem onClick={this.signOut}>Sign Out</MenuItem>
        </NavDropdown>
      );
    }
    const { showing } = this.state;
    return (
      <>
        <NavItem onClick={this.showModal}>
          Sign in
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal} bsSize="sm">
          <Modal.Header closeButton>
            <Modal.Title>Sign in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GoogleLogin
              clientId={clientID}
              buttonText="Sign in with Google"
              onSuccess={this.signIn}
              cookiePolicy="single_host_origin"
              isSignedIn
            />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
