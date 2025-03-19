import React, { useState } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledSquare = styled(Button)(({ theme }) => ({
  width: '100px',
  height: '100px',
  fontSize: '36px',
  lineHeight: '100px',
  textAlign: 'center',
  cursor: 'pointer',
  border: '2px solid #000',
  transition: 'background-color 0.3s ease',
}));

function Square({ value, onClick, selected }) {
  return (
    <StyledSquare
      variant="outlined"
      onClick={onClick}
      sx={{
        backgroundColor: selected ? '#e0f7fa' : '#fff',
        color: value === 'X' ? '#1e88e5' : value === 'O' ? '#d32f2f' : '#000',
        borderColor: selected ? '#00796b' : '#000',
      }}
    >
      {value}
    </StyledSquare>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [xCount, setXCount] = useState(0);
  const [oCount, setOCount] = useState(0);
  const [winner, setWinner] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [openDialog, setOpenDialog] = useState(true);

  const handleClick = (index) => {
    if (winner) return;

    if ((xCount < 4 && turn === 'X') || (oCount < 4 && turn === 'O')) {
      // Place a new symbol
      if (squares[index] === null) {
        const newSquares = [...squares];
        newSquares[index] = turn;
        setSquares(newSquares);
        if (turn === 'X') setXCount(xCount + 1);
        else setOCount(oCount + 1);
        checkWinner(newSquares);
        setTurn(turn === 'X' ? 'O' : 'X');
      }
    } else {
      // Move an existing symbol
      if (selectedSquare === null) {
        // Select a square to move
        if (squares[index] && squares[index] === turn) {
          setSelectedSquare(index);
        }
      } else {
        // Move the symbol to the clicked square
        if (squares[index] === null) {
          const newSquares = [...squares];
          newSquares[index] = newSquares[selectedSquare];
          newSquares[selectedSquare] = null;
          setSquares(newSquares);
          setSelectedSquare(null);
          checkWinner(newSquares);
          setTurn(turn === 'X' ? 'O' : 'X');
        } else {
          // If the destination square is not empty, clear the selection
          setSelectedSquare(null);
        }
      }
    }
  };

  const checkWinner = (squares) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        return;
      }
    }

    // Check for a draw
    if (!squares.includes(null)) {
      setWinner('Draw');
    }
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
    setXCount(0);
    setOCount(0);
    setSelectedSquare(null);
    setOpenDialog(true); // Show rules dialog again
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ textAlign: 'center', mt: "20px" }}>
      {/* Rules Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Game Rules</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Welcome to Tic Tac Toe! Here are the rules:
            <ul>
              <li>Each player can place up to four symbols on the board.</li>
              <li>Once both players have placed four symbols, they can move their pieces.</li>
              <li>The game ends when one player aligns three symbols in a row or diagonally.</li>
            </ul>
            Have fun!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDialog}>
            Start Game
          </Button>
        </DialogActions>
      </Dialog>

      {/* Game Board */}
      <Grid container spacing={0} justifyContent="center" sx={{ maxWidth: "320px", margin: "auto" }}>
        {squares.map((square, index) => (
          <Grid item xs={4} key={index}>
            <Square
              value={square}
              onClick={() => handleClick(index)}
              selected={selectedSquare === index}
            />
          </Grid>
        ))}
      </Grid>

      {/* Winner Display */}
      {winner && (
        <Box sx={{ mt: "20px" }}>
          <Typography variant="h5" color="primary">
            {winner === 'Draw' ? "It's a draw!" : `Winner: ${winner}`}
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Reset Game
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Board;
