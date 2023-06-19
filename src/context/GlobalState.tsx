import { createContext, useReducer, useEffect } from "react";
import { AppReducer } from "./AppReduce";

interface State {
  stocksData: [];
}

const initialState: State = { stocksData: [] };

export const Context = createContext<any>(null);

//En este componente estan las funciones para agregar o quitar los elementos de la lista de favoritos usando useReduce y acciendolas accecibles desde el contexto de la aplicacion
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
