import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

function App() {

  const [address, setAddress] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [balance, setBalance] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(()=> {

  })

  const login = () => {
    axios.post('http://localhost:8080/users/loginWallet', {privateKey: privateKey}).then(res => {
      console.log(res);
      setAddress(res.data.address);
      setPrivateKey(res.data.privateKey)
    })
  }

  const createNewWallet = () => {
    axios.get('http://localhost:8080/users/createWallet').then(res => {
      console.log(res);
      setAddress(res.data.address);
      setPrivateKey(res.data.privateKey)
    })
  }

  const checkBalance = () => {
    axios.get('http://localhost:8080/users/getBalance?address='+address).then(res => {
      console.log(res);
      setBalance(res.data.balance)
    })
  }

  const transfer = () => {
    axios.post('http://localhost:8080/users/sendEther', {privateKey: privateKey, amount: amount, toAddress: toAddress}).then(res => {
      setMessage(res.data.receipt)
    })
  }
  return (
    <Container>
    <br/>
        <Grid container spacing={3} direction="column">
          <Grid item xs={3}>
          <Paper>
            <Button color="primary" variant="contained" onClick={createNewWallet}>Create new account </Button><br/>
            {"Address: "+ address}<br/>
            {"Private Key: "+privateKey}<br/>
            {address && <Button color="primary" variant="contained" onClick={checkBalance}>Check Balance</Button>}<br/>
            {balance && <>{'Your wallet balance is:'}{balance}{'Ethers'}</>}<br/>
          </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>{'Transfer'}<br/><br/>
              <TextField
                required
                id="outlined-required"
                label="To Address"
                defaultValue="0xABC..."
                onChange={(e) => setToAddress(e.target.value)}
                variant="outlined"
              /><br/><br/>
              <TextField
                required
                id="outlined-required"
                label="Amount"
                defaultValue="0"
                onChange={(e) => setAmount(e.target.value)}
                variant="outlined"
              /><br/>
              <Button color="primary" variant="contained" onClick={transfer}>Transfer </Button><br/>
              {message && <>Transfer done. Receipt is:{message}</>}
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>
            {'Login using Private Key:'}<br/><br/>
            <TextField
              required
              id="outlined-required"
              label="PrivateKey"
              defaultValue="0xABC..."
              onChange={(e) => setPrivateKey(e.target.value)}
              variant="outlined"
            /><br/>
            <Button color="primary" variant="contained" onClick={login}>Login </Button><br/>
             </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper></Paper>
          </Grid>
        </Grid>
    </Container>
  );
}

export default App;
