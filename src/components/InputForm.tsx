import React, { useState } from 'react';
import { Input, Button } from '@web3uikit/core';

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function InputForm() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  const submitFunction = () => {
    if (!window.ethereum) {
      alert('Please add MetaMask wallet extension to your browser');
    }

    const data = {
      address,
      amount,
    };
    console.log(data);
  };

  return (
    <div className="d-flex flex-column align-items-center w-25 border rounded border-primary input-form">
      <Input
        value={address}
        onChange={(event) => setAddress(event.target.value)}
        size="large"
        type="text"
        placeholder="Address"
      />
      <Input
        value={amount}
        onChange={(event) => setAmount(event.target.value)}
        size="large"
        type="number"
        placeholder="Amount"
      />
      <div className="d-flex">
        <Button
          onClick={() => {
            setAddress('');
            setAmount('');
          }}
          text="clear"
          theme="secondary"
        />
        <Button
          onClick={() => submitFunction()}
          text="Send"
          size="large"
          theme="secondary"
        />
      </div>
    </div>
  );
}
