import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import MainNavbar from '../components/MainNavbar';
import { changePassword } from '../stores/user';

export default function ChangePassword(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(changePassword({ oldPassword, newPassword, navigate }))
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
          <Form onSubmit={submitHandler} style={{paddingTop: '1em', paddingBottom: '1em'}}>
            <Form.Group className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control type="password" placeholder="Enter old password" onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
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