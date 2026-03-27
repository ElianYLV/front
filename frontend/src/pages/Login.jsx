import { useState } from "react";

function Login({ setUser }) {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

const handleLogin = async () => {
  const res = await fetch("http://localhost:3001/api/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);

    setUser({
      token: data.token,
      nombre: nombre
    });

    setAlert("");
  } else {
    setAlert(data.error || "Credenciales incorrectas");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundImage: 'url(/fondo4.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl border border-slate-200 p-8 max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">Iniciar Sesión</h2>

        {alert && <div className="mb-4 rounded-lg px-3 py-2 bg-rose-100 text-rose-900 border border-rose-200">{alert}</div>}

        <input
          placeholder="Nombre de usuario"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button 
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;