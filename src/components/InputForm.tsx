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
  const [error, setError] = useState<string | null>();
  const [success, setSuccess] =
    useState<ethers.providers.TransactionResponse | null>(null);

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

      ethers.utils.getAddress(address);

      const transaction = await signer.sendTransaction({
        to: address,
        value: ethers.utils.parseEther(amount.toString()),
      });

      setSuccess(transaction);

      console.log(transaction.hash);
    } catch (err: any) {
      setError(err.message);
      console.log(err.message);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center w-25 border rounded input-form pt-4 pb-3">
      <div className="mt-3">
        <Input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          size="large"
          type="text"
          placeholder="Address"
        />
      </div>
      <div className="mt-3">
        <Input
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          size="large"
          type="number"
          placeholder="Amount"
        />
      </div>
      <div className="d-flex mt-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => {
            setAddress('');
            setAmount('');
            setError('');
          }}
        >
          clear
        </button>
        <button
          className="btn btn-primary ms-2"
          onClick={() => submitFunction()}
        >
          Send
        </button>
      </div>
      {error && <p className=" mx-4 bg-danger text-white mt-2">{error}</p>}
      {success && (
        <p className="bg-info text-white mx-4 mt-2">
          Click{' '}
          <a
            target="_blank"
            href={'https://ropsten.etherscan.io/tx/' + success.hash}
          >
            here
          </a>{' '}
          to see transaction (note this may take 30 seconds)
        </p>
      )}
    </div>
  );
}
