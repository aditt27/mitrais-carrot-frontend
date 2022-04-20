import React, { useState } from 'react';
import MCarrotLogo from '../assets/img/mitrais-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../stores/authThunk';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rejected = useSelector(state => state.authReducer.rejected);

  const handleSubmit = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === true) {
      e.preventDefault();
      e.stopPropagation();
      dispatch(login({ username, password, navigate }));
    } else {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <Card className='card-signin my-5'>
            <Card.Body>
              <div className="text-center mb-4">
                <img src={MCarrotLogo}
                  alt='Mitrais Carrot Logo' className="img-fluid" />
              </div>
              <Form className="form-signin" method='POST' noValidate validated={validated} onSubmit={handleSubmit}>
                <Alert show={rejected} variant="danger">
                  username or password incorrect
                </Alert>
                <Form.Group className="mb-3 form-label-group">
                  <Form.Control type="text" id="username" name="username" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Username cannot blank
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3 form-label-group">
                  <Form.Control type="password" id="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                  <Form.Control.Feedback type="invalid">
                    Password cannot blank
                  </Form.Control.Feedback>
                </Form.Group>

                <Button className="btn-block btn-mitrais text-uppercase" type="submit">
                  <FontAwesomeIcon icon="lock" className='mr-2' />
                  Sign in
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div >
  );

}