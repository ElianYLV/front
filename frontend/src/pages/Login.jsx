import { useState } from "react";

function Login({ setUser }) {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const API_URL = "https://back-ubx7.onrender.com/api";

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser({ nombre, token: data.token });
        setAlert("");
      } else {
        setAlert(data.error);
      }

    } catch (error) {
      setAlert("Error servidor");
    }
  };

  return (
    <div>
      <input placeholder="Usuario" onChange={e => setNombre(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
      {alert && <p>{alert}</p>}
    </div>
  );
}

export default Login;