import axios from "axios";
const url: any = process.env.REACT_APP_URL_LOGIN;
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
