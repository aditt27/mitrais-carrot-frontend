import React, { useState } from 'react';
import MCarrotLogo from '../assets/img/mitrais-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { login } from '../stores/authThunk';
import  { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({username, password, navigate}));
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
              <Form className="form-signin" method="POST" onSubmit={handleSubmit}>
                <Form.Group className="mb-3 form-label-group">
                  <Form.Control type="text" id="username" name="username" placeholder="Username" required="" autoFocus="" onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3 form-label-group">
                  <Form.Control type="password" id="password" name="password" placeholder="Password" required="" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button className="btn-block btn-mitrais text-uppercase" type="submit">
                  <FontAwesomeIcon icon="lock"  className='mr-2'/>
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