import Coins from './Coins'

interface Props {
  currency: string,
  symbol:string
}

const Homepage = ({currency, symbol}: Props) => {
  
  return (
    <div>
      <Coins currency={currency} symbol={symbol}/>
    </div>
  )
}

export default Homepage