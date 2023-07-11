import React from 'react';
import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import axios from '../../components/axios';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import { useLocation } from 'react-router-dom';


function Financial() {
 

  return (
    <>
      <Header />
    <Container>
    <div className="heading"><h2>Selling something new?</h2></div>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicShopName">
        <Form.Label>Owner's Name</Form.Label>
        <Form.Control type="text" placeholder = {loggedInUser} readOnly="true" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicShopName">
        <Form.Label>Shop Name</Form.Label>
        <Form.Control type="text" placeholder={loggedInShop} readOnly="true"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicDescription">
        <Form.Label>New Items</Form.Label>
        <Form.Control type="text" placeholder="New Items" onChange={e => setItems(e.target.value)}/>
      </Form.Group>
      <Button variant="primary" type="submit" href="/sellerhome" onClick={(e) => handleSubmit(e)}>
        Add
      </Button>
    </Form>
    </Container>
    </>
  );
};

export default Financial;
