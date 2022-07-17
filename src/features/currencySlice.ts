import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CurrencyState {
    currency: string,
    symbol: string
} 

const initialState: CurrencyState = {
    currency: "USD",
    symbol: "$"
}

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        SwitchCurrency: (state, action: PayloadAction<string>) => {
        //    if(action.type == "USD"){
        //       return state.currency = "USD"
        //    }
        }
    }
})



export default currencySlice.reducer