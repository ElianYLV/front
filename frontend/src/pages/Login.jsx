const API_URL = import.meta.env.VITE_API_URL;

const handleLogin = async () => {
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
    setUser({ token: data.token, nombre });
    setAlert("");
  } else {
    setAlert(data.error || "Credenciales incorrectas");
  }
};