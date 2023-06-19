//Usando la funciones declaradas en el GlobaState aca se decide que funcion ejecuta
export const AppReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_STOCKS":
      const symbolToAdd = action.payload.symbol;
      const stockExists = state.stocksData.find(
        (stockData: any) => stockData.symbol === symbolToAdd
      );

      if (stockExists) {
        return state; // ya existe, no se agrega de nuevo
      }

      return {
        ...state,
        stocksData: [...state.stocksData, action.payload],
      };

    case "DELETE_STOCKS":
      return {
        ...state,
        stocksData: state.stocksData.filter(
          (stockData: any) => stockData.symbol !== action.payload
        ),
      };

    default:
      return state;
  }
};
