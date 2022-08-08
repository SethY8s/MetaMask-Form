import React, { useState } from 'react';
import { Input, Button } from '@web3uikit/core';

export default function InputForm() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  return (
    <div className="input-form">
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
        type="text"
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
          onClick={() => {
            const data = {
              address,
              amount,
            };
            console.log(data);
          }}
          text="Send"
          size="large"
          theme="secondary"
        />
      </div>
    </div>
  );
}
