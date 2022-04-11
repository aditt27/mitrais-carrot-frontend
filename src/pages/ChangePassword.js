import { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import { changePassword } from '../stores/user';

export default function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rejected = useSelector(state => state.userReducer.rejected);

  const submitHandler = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === true) {
      e.preventDefault();
      e.stopPropagation();
      dispatch(changePassword({ oldPassword, newPassword, navigate }))
    } else {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  }

  const containerStyle = {
    backgroundColor: '#ECF0F5'
  }

  const titleStyle = {
    marginTop: '1em',
    marginBottom: '0.8em',
    color: '#838e9b',
    fontFamily: 'Verdana',
    textTransform: 'uppercase'
  }

  const contentStyle = {
    backgroundColor: 'white',
    borderRadius: '8px'
  }

  return (
    <div style={containerStyle}>
      <MainNavbar />
      <Container>
        <h2 style={titleStyle}>{'Change Password'}</h2>
        <Container style={contentStyle}>
          <Form onSubmit={submitHandler} noValidate validated={validated} style={{ paddingTop: '1em', paddingBottom: '1em' }}>
            <Alert show={rejected} variant="danger">
              Old password not match
            </Alert>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" required placeholder="Enter old password" onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
              <Form.Control.Feedback type="invalid">
                Old password cannot blank
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" required placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
              <Form.Control.Feedback type="invalid">
                New password cannot blank
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </Container>
      <footer className='text-center py-3'>
        <small>Mitrais FG 2022 Team 3</small>
      </footer>
    </div>
  )
}