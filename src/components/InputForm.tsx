import React, { useState } from 'react';
import { Input, Button } from '@web3uikit/core';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function InputForm() {
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState();

  const submitFunction = async () => {
    try {
      if (!window.ethereum) {
        throw new Error(
          'You do now have MetaMask waller, please add extenison to continue'
        );
      }
      await window.ethereum.send('eth_requestAccounts');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      ethers.utils.getAddress(address)

      const transaction = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount.toString()),
      });

      const data = {
        address,
        amount,
      };
      console.log(data);
    } catch (err: any) {
      setError(err.message);
      console.log(err.message);
    }
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
      <p>{error}</p>
    </div>
  );
}
