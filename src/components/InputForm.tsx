import React from 'react';
import { Input, Button } from '@web3uikit/core';

export default function InputForm() {
  return (
    <div className="input-form">
      <Input size="large" type="text" placeholder="Address" />
      <Input size="large" type="text" placeholder="Amount" />
      <div className="d-flex">
        <Button text="clear" theme="secondary" />
        <Button text="Send" size="large" theme="secondary" />
      </div>
    </div>
  );
}
