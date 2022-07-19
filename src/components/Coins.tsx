import { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './css/Coins.css'
import Spinner from './Spinner';

interface Props {
  currency: string,
  symbol:string,
}

interface CoinList {
  id: string,
  name: string,
  image: string,
  symbol: string,
  current_price: number,
  market_cap: number,
  market_cap_rank: number,
  price_change_percentage_24h: number,
}


const Coins = ({currency, symbol}: Props) => {

  const navigate = useNavigate()
 
  const [coins, setCoins] = useState<CoinList[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostPerPage] = useState<number>(12);

  const getAllCoins = async () => {
    setLoading(true);
    try {
     const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
     const data = await res.json();
     return setCoins(data);
    } catch (error) {
     console.log(error)
    }
    setLoading(false);
 };

 useEffect(() => {
  getAllCoins();
}, [currency]);

useEffect(() => {
  window.scrollTo(0, 0);
}, [currentPage]);

const handleSearch = () => {
  return coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
  );
};

function currencyFormat(x: number | string) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


// Pagination
const indexOfLastPage = currentPage * postsPerPage;
const indexOfFirstPage = indexOfLastPage - postsPerPage;
const totalItems = coins.length
const pageCount = Math.ceil(totalItems / postsPerPage)

  return (
    <div className='container px-5 lg:px-20 text-white'>
      {!loading &&
         <Spinner />
      }

{loading &&
<div className='mt-28'>
  <div className='mb-8'>
    <h1 className='text-4xl sm:text-6xl text-center text-slate-400 font-semibold name'>Cryptocurrencies</h1>
    <p className='text-center text-base sm:text-lg text-blue-100 mt-2'>Get all the latest info about your favourite cryptocurrencies</p>
  </div>

  <div>
  <form className="xl:px-52 mb-10">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" 
          id="simple-search" 
          className="bg-gray-100 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for a cryptocurrency"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
    </div>
</form>
  </div>

  {!search && <div className='coins-container'>
  <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3  xl:grid-cols-4  justify-center inner-coins-cont'>
  {coins.slice(indexOfFirstPage, indexOfLastPage,).map((coin) => {
    const change: boolean = coin.price_change_percentage_24h > 0;
  return (
    <div key={coin.id} >
      <div onClick={()=>navigate(`coins/${coin.id}`)}  className="coin-card block p-6 max-w-sm rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
       <div>
          <div className='flex justify-between border-b border-slate-500 pb-3.5'>
            <div className='grid grid-cols-1 coin-name'>
               <span className='text-lg name'>{coin.name}</span>
               <span className='uppercase text-slate-200 font-medium'>{coin.symbol}</span>
            </div>
            <div>
              <img src={coin?.image} alt={coin.name} className='w-14'/>
            </div>
          </div>
          <div className='pt-3.5 text-sm font-medium'>
            <div className='flex flex-col'>
              <span className='mt-2'><span className='text-slate-400 mr-2'>Rank:</span> #{coin.market_cap_rank}</span>
              <span className='mt-2'><span className='text-slate-400 mr-2'>Price:</span> {symbol}{currencyFormat(coin.current_price.toFixed(2))}</span>
            </div>
            <div className='flex flex-col'>
              <span className='mt-2'><span className='text-slate-400 mr-2'>Market Cap:</span> {symbol}{currencyFormat(coin.market_cap.toString().slice(0, -9))} B</span>
              <span className='mt-2'><span className='text-slate-400 mr-2'>Daily Change:</span> <span style={{color: change ? "#9fff9b" : "#ff9f9f",}}>{change && "+"}{coin.price_change_percentage_24h.toFixed(2)}%</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
 })}
 </div>

 <div>
  {currentPage && <div className='flex justify-center pagination-cont'>
   <ul className="inline-flex items-center -space-x-px">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e) =>  {
          setCurrentPage(e.selected + 1)
        }}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="<<"
        pageClassName="pagination-cont"
        containerClassName="pagination"
        pageLinkClassName="page-link"
        previousLinkClassName="previous-link"
        previousClassName="previous-class"
        nextLinkClassName="next-link"
        activeClassName="active-pagination"
      />
    </ul>
  </div>}
 </div>
</div>}


{search && <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8  xl:grid-cols-4  justify-center inner-coins-cont'>
  {handleSearch().map((coin) => {
    const change: boolean = coin.price_change_percentage_24h > 0;
  return (
    <div key={coin.id} >
      <Link to={`/coins/${coin.id}`} className="coin-card block p-6 max-w-sm rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
       <div>
          <div className='flex justify-between border-b border-slate-500 pb-3.5'>
            <div className='grid grid-cols-1 coin-name'>
               <span className='text-lg name'>{coin.name}</span>
               <span className='uppercase text-slate-200 font-medium'>{coin.symbol}</span>
            </div>
            <div>
              <img src={coin?.image} alt={coin.name} className='w-14'/>
            </div>
          </div>
          <div className='pt-3.5 text-sm font-medium'>
            <div className='flex flex-col'>
              <span className='mt-2'><span className='text-slate-400 mr-2'>Rank:</span> {coin.market_cap_rank}</span>
              <span className='mt-2'><span className='text-slate-400 mr-2'>Price:</span> {symbol} {currencyFormat(coin.current_price.toFixed(2))}</span>
            </div>
            <div className='flex flex-col'>
              <span className='mt-2'><span className='text-slate-400 mr-2'>Market Cap:</span> {symbol}{currencyFormat(coin.market_cap.toString().slice(0, -9))} B</span>
              <span className='mt-2'><span className='text-slate-400 mr-2'>Daily Change:</span> <span style={{color: change ? "#9fff9b" : "#fca5a5",}}>{change && "+"}{coin.price_change_percentage_24h.toFixed(2)}%</span></span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
 })}
 {handleSearch().length === 0 && search && <div className='font-center text-xl'>No match Found</div>}
</div>}
</div>
}
    </div>
  )
}

export default Coins