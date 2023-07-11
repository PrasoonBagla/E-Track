import React from 'react';
import axios from '../../components/axios';
// import Container from "react-bootstrap/esm/Container";
import { Card,Container,Button} from '@mui/material';
import { useState, useEffect } from 'react';
import { ChartsHeader, LineChart } from '../../components';
function Line() {

  const [transactions, settransactions] = useState([]);
  useEffect(() => {
    axios.post('/getIncomeTransactions', 
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
        <Button variant="outlined" color="primary">Edit</Button>
         <Button variant="outlined" color="error" onClick={DeleteTransaction(pushp._id)}>Delete</Button>
        {/* <img src={call} width={40} height={40} /> */}
      </Card.Body>
    </Card>
  ))}
  {/* <Button variant="contained" color="primary" onClick = {<AddTransaction />}>Add Transaction</Button> */}
</Container>)
} 

export default Line;
