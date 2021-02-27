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
  const [bankBalance, setBankBalance] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [depositMessage, setDepositMessage] = useState('');
  const [withdrawMessage, setWithdrawMessage] = useState('');
  
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

  const checkBankBalance = () => {
    axios.get('http://localhost:8080/users/getBankBalance?address='+address).then(res => {
      console.log(res);
      setBankBalance(res.data.balance)
    })
  }

  const transfer = () => {
    axios.post('http://localhost:8080/users/sendEther', {privateKey: privateKey, amount: amount, toAddress: toAddress}).then(res => {
      setMessage(res.data.receipt)
    })
  }
  const deposit = () => {
    axios.post('http://localhost:8080/users/depositEther', {privateKey: privateKey, amount: amount}).then(res => {
      setDepositMessage(res.data.receipt)
    })
  }

  const withdraw = () => {
    axios.post('http://localhost:8080/users/withdrawEther', {privateKey: privateKey, amount: amount}).then(res => {
      setWithdrawMessage(res.data.receipt)
    })
  }
  return (
    <Container>
    <br/>
        <Grid container spacing={3} direction="row">
        <Grid item xs={6}>
          <Grid item xs={12}>
            <Paper>
              <Button color="primary" variant="contained" onClick={createNewWallet}>Create new account </Button><br/>
              {"Address: "+ address}<br/>
              {"Private Key: "+privateKey}<br/>
              {address && <Button color="primary" variant="contained" onClick={checkBalance}>Check Balance</Button>}<br/>
              {balance && <>{'Your wallet balance is:'}{balance}{'Ethers'}</>}<br/>
            </Paper>
            </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={6}>
          <Grid item xs={12}>

              <Paper>
                <div style={{textAlign: "center"}}>Demo Bank</div><br/>
                {"Address: "+ address}<br/>
              {"Private Key: "+privateKey}<br/>
              {address && <Button color="primary" variant="contained" onClick={checkBankBalance}>Check Bank Balance</Button>}<br/>

              {bankBalance && <>{'Your Bank balance is:'}{bankBalance?bankBalance: '0'}{'Ethers'}</>}<br/>
              </Paper>
          </Grid>
          <Grid item xs={12}>
              <Paper>{'Deposit in Bank'}<br/><br/>
                <TextField
                  required
                  id="outlined-required"
                  label="Amount"
                  defaultValue="0"
                  onChange={(e) => setAmount(e.target.value)}
                  variant="outlined"
                /><br/>
                <Button color="primary" variant="contained" onClick={deposit}>Deposit </Button><br/>
                {depositMessage && <>Deposit done. Receipt is:{depositMessage}</>}
              </Paper>
              <Paper>{'Withdraw from Bank'}<br/><br/>
                <TextField
                  required
                  id="outlined-required"
                  label="Amount"
                  defaultValue="0"
                  onChange={(e) => setAmount(e.target.value)}
                  variant="outlined"
                /><br/>
                <Button color="primary" variant="contained" onClick={withdraw}>Withdraw </Button><br/>
                {withdrawMessage && <>Withdrawal done. Receipt is:{withdrawMessage}</>}
              </Paper>
            </Grid>
        </Grid>
          
          
        </Grid>
        
    </Container>
  );
}

export default App;
