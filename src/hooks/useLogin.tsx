import axios from "axios";
const url: any = process.env.REACT_APP_URL_LOGIN;

////funcion que se conecta al API-ORIGIN-CHALLENGE y valida al usuario
export async function validate(data: any) {
  try {
    const response = await axios({
      method: "POST",
      url: url,
      data: data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
