import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from './Spinner'

interface Props {
  currency: string,
  symbol: string
}

interface SingleCoin {
  id: string,
  name: string,
  image: string,
  symbol: string,
  ath: number,
  atl: number,
  current_price: number,
  fully_diluted_valuation: number,
  market_cap: number,
  market_cap_rank: number,
  max_supply: number,
  price_change_percentage_24h: number,
  total_supply: number,
  total_volume: number,
}

interface SingleCoinDesc{
  description: Description,
}

interface Description {
  en: string
}


const Coin = ({currency, symbol}: Props) => {

  const [coin, setCoin] = useState<SingleCoin[]>([])
  const [coinDesc, setCoinDesc] = useState<SingleCoinDesc | null>(null)
  const [loading, setLoading] = useState<Boolean>(false);
  const { id } = useParams<string>()

  const getCoin = async () => {
    setLoading(true);
    try {
     const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}`)
     const data = await res.json();
     return setCoin(data);
    } catch (error) {
     console.log(error)
    }
    setLoading(false);
 };

 const getCoinDesc = async () => {
  setLoading(true);
  try {
   const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
   const data = await res.json();
   return setCoinDesc(data);
  } catch (error) {
   console.log(error)
  }
  setLoading(false);
};

function currencyFormat(x: number | string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
 
 useEffect(() => {
  getCoin();
}, [currency]);

useEffect(() => {
  getCoinDesc();
}, []);

function createMarkup() {
  return {__html: `${coinDesc?.description.en.split(". ")[0]}. ${coinDesc?.description.en.split(". ")[1]}. ${coinDesc?.description.en.split(". ")[2]}.`};
}

  return (
    <div className='container px-5 lg:px-20 text-white'>

      {!coinDesc && 
        <Spinner />
      }
     
     {coinDesc && 
      <div className='bg-slate-700 rounded-lg'>
        <div className='flex justify-between pt-10 pb-10 mt-28'>
          <div>
           {coin.map((coin) => {
            const change: boolean = coin.price_change_percentage_24h > 0;
            return <div>
             <div  className='flex justify-center'>
              <div className='flex flex-col justify-center items-center mb-2'>
                <img src={coin?.image} alt={coin.name} className='w-48'/>
                <span className='text-5xl font-semibold mt-4 name'>{coin.name}</span>
              </div>
             </div>
             <div className='flex justify-center items-center text-xl'>
                <span className='border-r border-slate-500 pr-4'>{symbol}{currencyFormat(coin.current_price.toFixed(2))}</span>
                <span className='pl-4'><span style={{color: change ? "#9fff9b" : "r#fca5a5",}}>{change && "+"}{coin.price_change_percentage_24h.toFixed(2)}%</span></span>
             </div>
            </div>
          })}

          <div className='px-4 sm:px-12 lg:px-24 my-12'>
            <div dangerouslySetInnerHTML={createMarkup()} />
          </div>

          {coin.map((coin) => {
            return <div className='pl-10'>
             <div className='flex flex-col sm:flex-row justify-center'>
              <div className='flex justify-between md:flex-col md:border-r border-slate-500 md:pr-14'>
               <div className='flex flex-col w-32 border-r border-slate-500 sm:border-0'>
                  <span className='text-slate-400'>Rank</span>
                  <span>#{coin?.market_cap_rank}</span>
                </div>
                <div className='flex flex-col w-36 md:mt-8'>
                  <span className='text-slate-400'>Market Cap</span>
                  <span>{symbol}{currencyFormat(coin?.market_cap.toString().slice(0, -9))} Bn</span>
                </div>
              </div>

              <div className='flex justify-between md:flex-col md:border-r border-slate-500 md:pr-14 md:pl-14'>
               <div className='flex flex-col w-32 pt-6 sm:pt-0 border-r border-slate-500 sm:border-0'>
                  <span className='text-slate-400'>Total Volume</span>
                  <span>{symbol}{currencyFormat(coin?.market_cap.toString().slice(0, -9))} Bn</span>
                </div>
                <div className='flex flex-col w-36 pt-6 sm:pt-0 md:mt-8'>
                  <span className='text-slate-400'>Total Supply</span>
                  <span>{currencyFormat(coin?.total_supply.toString().slice(0, -6))} M</span>
                </div>
              </div>
               
              <div className='flex justify-between md:flex-col md:pl-14'>
                <div className='flex flex-col w-32 pt-6 sm:pt-0  border-r border-slate-500 sm:border-0'>
                  <span className='text-slate-400'>All Time High</span>
                  <span>{symbol}{currencyFormat(coin?.ath?.toFixed(2))}</span>
                </div>
                <div className='flex flex-col w-36 pt-6 sm:pt-0 md:mt-8'>
                  <span className='text-slate-400'>All Time Low</span>
                  <span>{symbol}{currencyFormat(coin?.atl?.toFixed(2))}</span>
                </div>
              </div> 
             </div>
            </div>
          })}
          </div>
        </div>
      </div>
    }
    </div>
  )
}

export default Coin