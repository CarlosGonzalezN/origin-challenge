import { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "./AppReduce";

interface State {
  stocksData: any[];
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = { stocksData: [] };

const userName = localStorage.getItem("user");

export const Context = createContext<any>(null);

export const GloblaProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const localData = localStorage.getItem("selectedItems");
    return localData ? JSON.parse(localData) : initialState;
  });

  const addStocks = (stocksData: any) => {
    dispatch({
      type: "ADD_STOCKS",
      payload: stocksData,
    });
  };

  useEffect(() => {
    localStorage.setItem("selectedItems", JSON.stringify(state));
  }, [state]);

  const deleteStocks = (symbol: string) => {
    dispatch({
      type: "DELETE_STOCKS",
      payload: symbol,
    });
  };

  return (
    <Context.Provider
      value={{
        stocksData: state.stocksData,
        addStocks,
        deleteStocks,
        userName,
      }}
    >
      {children}
    </Context.Provider>
  );
};
