import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface UserData {
  username: string;
  password: string;
}

type Url = string;

////funcion que se conecta al API-ORIGIN-CHALLENGE y valida al usuario
export async function validate(data: UserData): Promise<AxiosResponse> {
  try {
    const url: Url = process.env.REACT_APP_URL_LOGIN as Url;
    const response: AxiosResponse = await axios({
      method: "POST",
      url: url,
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
    const navigate = useNavigate();
    navigate("/error");
    throw error;
  }
}
