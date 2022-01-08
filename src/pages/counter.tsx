import { Button, Container, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
  selectCount,
} from "../features/counter";
import { AppDispatch } from "../store";

const Counter: NextPage = () => {
  const [amount, setAmount] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const counter: number = useSelector(selectCount);

  return (
    <Container>
      <Typography variant="h2">Counter: {counter}</Typography>
      <TextField
        label="Amount"
        value={amount}
        onChange={(event) => setAmount(parseInt(event.target.value, 10))}
      />
      <Typography variant="body2">
        <Button variant="outlined" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button variant="outlined" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(incrementByAmount(amount))}
        >
          Increment By Amount
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(incrementIfOdd(amount))}
        >
          Increment If Odd
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch(incrementAsync(amount))}
        >
          Increment Async
        </Button>
      </Typography>
    </Container>
  );
};

export default Counter;
