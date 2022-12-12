import React from 'react';
import {
  MenuItem, NavDropdown, Modal, Button, NavItem,
} from 'react-bootstrap';
import { GoogleLogin } from '@react-oauth/google';
import withToast from './ToastWrapper.jsx';

class SignInNavItem extends React.Component {
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

  async componentDidMount() {
    await this.loadData();
  }

  async loadData() {
    const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    const response = await fetch(`${apiEndpoint}/user`, {
      method: 'POST',
    });
    const body = await response.text();
    const result = JSON.parse(body);
    const { signedIn, givenName } = result;
    this.setState({ user: { signedIn, givenName } });
  }

  async signIn(response) {
    this.hideModal();
    const googleToken = response.credential;
    const { showError } = this.props;
    try {
      const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
      const verificationResponse = await fetch(`${apiEndpoint}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ google_token: googleToken }),
      });
      const body = await verificationResponse.text();
      const result = JSON.parse(body);
      const { signedIn, givenName } = result;

      this.setState({ user: { signedIn, givenName } });
    } catch (error) {
      showError(`Error signing into the app: ${error}`);
    }
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
              onSuccess={this.signIn}
              onError={() => console.log('Login failed')}
              theme="filled_black"
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

export default withToast(SignInNavItem);
