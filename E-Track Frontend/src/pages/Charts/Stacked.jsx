import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {styled,Button} from '@mui/material'
import axios from '../../components/axios';
import { useState, useEffect } from 'react';
import Pyramid from '../Charts/Pyramid';
const EditButton = styled(Button)`
margin-left = 10px;

`

function Stacked (){

// post request to get all transactions
const [transactions, settransactions] = useState([]);
useEffect(() => {
  axios.post('/getExpenseTransactions', 
  {
    id: '649682d4aaba6f70a92afb5e'
  })
  .then((response) => {
    settransactions(response.data);
  });
}, []);
// console.log(transactions);
// console.log(tempTwo[0].amount);

const DeleteTransaction = (e) => {
  // e.preventDefault();
  
  axios.delete('/deleteTransaction', 
  {
    id: {e},
  })
  .then((response) => {
    console.log(response);
  });
  // filter out the transaction with the id and set the state to the new array without the deleted transaction 
   settransactions(transactions.filter((el) => el._id !== e));
}
  
  return (<Container>
  <div className="hehe"><h5>All Transactions</h5></div>
  {transactions.map((pushp) => (
    <Card>
      <Card.Body>
        <Card.Title>{pushp.amount}</Card.Title>
        <Card.Text>
        {pushp.category}
        </Card.Text>
        <EditButton variant="outlined" color="primary">Edit</EditButton>
         <EditButton variant="outlined" color="error" onClick={DeleteTransaction(pushp._id)}>Delete</EditButton>
        {/* <img src={call} width={40} height={40} /> */}
      </Card.Body>
    </Card>
  ))}
  <Button variant="contained" color="primary" href='/pyramid'>Add Transaction</Button>
</Container>)
}

export default Stacked;
