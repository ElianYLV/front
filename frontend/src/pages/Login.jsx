import { useState } from "react";

function Login({ setUser }) {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, password }),
      });

      // ⚠️ evitar error de "<!DOCTYPE"
      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Respuesta no es JSON (seguramente 404)");
      }

      if (res.ok) {
        localStorage.setItem("token", data.token);

        setUser({
          token: data.token,
          nombre,
        });

        setAlert("");
      } else {
        setAlert(data.error || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      setAlert("Error conectando con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url(/fondo4.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl border p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
          Iniciar Sesión
        </h2>

        {alert && (
          <div className="mb-4 bg-red-100 text-red-700 p-2 rounded">
            {alert}
          </div>
        )}

        <input
          placeholder="Usuario"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 mb-6 rounded"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;