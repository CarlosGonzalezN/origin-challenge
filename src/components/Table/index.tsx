import React from "react";

import { useGlobalState } from "../../hooks/useContextState";
import TableItems from "../TableItems";

interface StockData {
  symbol: string;
  name: string;
  currency: string;
}

interface TableComponentProps {
  data: StockData[];
}

//Muestra los favoritos seleccionados
const TableComponent: React.FC<TableComponentProps> = () => {
  const { stocksData } = useGlobalState();

  return (
    <table className="min-w-full divide-y divide-gray-300 ">
      <thead>
        <tr>
          <th className="py-2 px-1 sm:px-2">Símbolo</th>
          <th className="py-2 px-1 sm:px-2">Nombre</th>
          <th className="py-2 px-1 sm:px-2">Moneda</th>
        </tr>
      </thead>
      <tbody>
        {stocksData.map((stockData: any) => (
          <TableItems data={stockData} key={stockData.symbol} />
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
