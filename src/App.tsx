import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Coin from './components/Coin';
import Header from './components/Header';
import Homepage from './components/Homepage';
import TrendingCoins from './components/TrendingCoins';
import Watchlist from './components/Watchlist';

function App() {
  const [currency, setCurrency] = useState<string>("USD")
  const [symbol, setSymbol] = useState<string>("$")
 
  console.log(currency)
  console.log(symbol)

  return (
       <div className='App'>
    <Router>
      <Header currency={currency} setCurrency={setCurrency} setSymbol={setSymbol}/>
      <Routes>
        <Route path='/' element={<Homepage currency={currency} symbol={symbol}/>}/>
        <Route path='/trending' element={<TrendingCoins currency={currency} symbol={symbol}/>}/>
        <Route path='/coins/:id' element={ <Coin currency={currency} symbol={symbol}/>} />
        <Route path='/watchlist' element={<Watchlist />}/>
      </Routes>
    </Router>
    <Router>
      
    </Router>
       </div>
  );
}

export default App;
