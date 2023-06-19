import { useState, ChangeEvent, FormEvent } from "react";
import { validate } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

interface FormValue {
  username: string;
  password: string;
}
//formulario para ingresar
const LoginForm: React.FC = () => {
  const [formValue, setFormValue] = useState<FormValue>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevFormValue) => ({
      ...prevFormValue,
      [name]: value,
    }));
  };
  //valida el usario y password
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    validate(formValue)
      .then(
        (data) => {
          if (data) {
            alert("Bienvenido/a");
            console.log(formValue.username);
            localStorage.setItem("user", formValue.username);
            navigate("/home");
          } else {
            window.alert("Verifica los datos ingresados");
          }
        },
        (error) => {
          console.log("error", error);
        }
      )
      .catch((ex) => console.error(ex));

    // Restablece los valores de los campos de entrada
    setFormValue({ username: "", password: "" });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl mb-4">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              name="username"
              value={formValue.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
              name="password"
              value={formValue.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
