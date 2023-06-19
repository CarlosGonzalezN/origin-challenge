import { useGlobalState } from "../../hooks/useContextState";
import { Link } from "react-router-dom";

interface StockData {
  symbol: string;
  name: string;
  currency: string;
}

interface TableItemsProps {
  data: StockData;
}
interface DeleteStocksFunction {
  (symbol: string): void;
}
//Itera los items del cuadro de favoritos
const TableItems: React.FC<TableItemsProps> = ({ data }) => {
  const { deleteStocks }: { deleteStocks: DeleteStocksFunction } =
    useGlobalState();

  const handleDeleteStock = () => {
    deleteStocks(data.symbol);
  };

  return (
    <tr key={data.symbol}>
      <td className="py-2 px-1 sm:px-2 text-center text-blue-700 ">
        <Link to={`/${data.symbol}`} state={{ stockData: data }}>
          {data.symbol}
        </Link>
      </td>
      <td className="py-2 px-1 sm:px-2 text-center">{data.name}</td>
      <td className="py-2 px-1 sm:px-2 text-center">{data.currency}</td>
      <td className="py-2 px-1 sm:px-2 text-center">
        <button onClick={handleDeleteStock}>Eliminar</button>
      </td>
    </tr>
  );
};

export default TableItems;
