import { useState } from "react";

const API_URL = "https://back-ubx7.onrender.com/api";

function Login({ setUser }) {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser({ nombre, token: data.token });
        setAlert("");
      } else {
        setAlert(data.error || "No se pudo iniciar sesion");
      }
    } catch (error) {
      setAlert("Error servidor");
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#dbeafe,_#93c5fd_22%,_#0f172a_78%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_35%,transparent_65%,rgba(255,255,255,0.06))]" />
      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="text-white">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            Pokedex Manager
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Administra tu mundo Pokemon con una entrada mas elegante.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
            Accede a tu panel para registrar, editar y organizar Pokemon con una
            interfaz visual mas limpia y moderna.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <FeatureCard title="Acceso rapido" text="Entra directo a tu panel sin distracciones." />
            <FeatureCard title="Control total" text="Gestiona registros y generaciones desde un solo lugar." />
            <FeatureCard title="Estilo consistente" text="La misma identidad visual en toda la app." />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-300/40 via-sky-400/20 to-indigo-500/40 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/20 bg-white/92 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.45)] backdrop-blur sm:p-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600">
                Iniciar sesion
              </p>
              <h2 className="mt-3 text-3xl font-black text-slate-900">
                Bienvenido de vuelta
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Escribe tus credenciales para continuar al panel principal.
              </p>
            </div>

            {alert && (
              <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {alert}
              </div>
            )}

            <div className="space-y-4">
              <Field
                label="Usuario"
                type="text"
                placeholder="Tu nombre de usuario"
                value={nombre}
                onChange={setNombre}
              />

              <Field
                label="Password"
                type="password"
                placeholder="Tu password"
                value={password}
                onChange={setPassword}
              />

              <button
                onClick={handleLogin}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-600"
              >
                Entrar al panel
              </button>
            </div>

            <div className="mt-8 rounded-[1.5rem] bg-slate-950 px-5 py-4 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-sky-300">
                Consejo
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Si el acceso falla, revisa usuario y password antes de volver a
                intentar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type, placeholder, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
      />
    </label>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-4 backdrop-blur">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200">
        {title}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-200">{text}</p>
    </div>
  );
}

export default Login;
