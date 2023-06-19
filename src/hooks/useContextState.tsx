import { useContext } from "react";
import { Context } from "../context/GlobalState";

export const useGlobalState = () => {
  const context = useContext(Context);

  return context;
};
