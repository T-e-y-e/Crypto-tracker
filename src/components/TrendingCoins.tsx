import { useEffect, useState } from 'react'
import './css/TrendingCoins.css'
import Spinner from './Spinner'

interface Props {
  currency: string,
  symbol: string
}

interface TrendingCoinList {
  id: string,
  name: string,
  image: string,
  symbol: string,
  current_price: number,
  price_change_percentage_24h: number
}

const TrendingCoins = ({currency, symbol}: Props) => {

  const [trendingCoins, setTrendingCoins] = useState<TrendingCoinList[]>([])
  const [loading, setLoading] = useState<Boolean>(false)

  const getTrendingCoins = async () => {
     setLoading(true);
     try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
      const data = await res.json();
      return setTrendingCoins(data);
     } catch (error) {
      console.log(error)
     }
     setLoading(false)
  }

  useEffect(() => {
    getTrendingCoins()
  }, [currency])

  function currencyFormat(x: number | string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className='container px-5 lg:px-20 text-white'>
     {!trendingCoins && 
        <Spinner />
      }

    {trendingCoins &&
    <div className='mt-28'>
      <div className='mb-12'>
        <h1 className='text-4xl sm:text-6xl text-center text-slate-400 font-semibold name'>Trending Coins</h1>
      </div>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 justify-center'>
      {trendingCoins.map((coin) => {
      const change: boolean = coin.price_change_percentage_24h > 0;
      return (
        <div key={coin.id}>
          <div className="coin-card block p-6 max-w-sm rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
           <div>
              <div className='flex justify-between border-b border-slate-500 pb-3.5'>
                <div>
                  <img src={coin?.image} alt={coin.name} className='w-14'/>
                </div>
                <div className='grid grid-cols-1 coin-name'>
                   <span className='text-lg name'>{coin.name}</span>
                   <span className='uppercase text-slate-400 font-medium'>{coin.symbol}</span>
                </div>
              </div>
              <div className='flex justify-between pt-3.5'>
                <span>
                  {symbol}{currencyFormat(coin.current_price.toFixed(2))}
                </span>
                <span className='coin-name'>
                <span style={{color: change ? "#9fff9b" : "#ff9f9f",}}>{change && "+"}{coin.price_change_percentage_24h.toFixed(2)}%</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )
     })}
      </div>
    </div>
    }
    </div>
  )
}

export default TrendingCoins