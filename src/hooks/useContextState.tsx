import { useContext } from "react";
import { Context } from "../context/GlobalState";
//custom hook para acceder a los estados globales
export const useGlobalState = () => {
  const context = useContext(Context);

  return context;
};
