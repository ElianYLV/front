import { useEffect, useState } from "react";

const API_URL = "https://back-ubx7.onrender.com/api";

const accentColors = [
  "from-red-400 via-rose-400 to-orange-300",
  "from-amber-400 via-yellow-300 to-orange-200",
  "from-lime-400 via-emerald-300 to-green-200",
  "from-sky-400 via-cyan-300 to-blue-200",
  "from-indigo-400 via-violet-300 to-fuchsia-200",
  "from-pink-400 via-rose-300 to-orange-200",
];

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState("");
  const [generacion, setGeneracion] = useState("");

  const fetchPokemons = async () => {
    try {
      const res = await fetch(`${API_URL}/pokemon`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setPokemons(data);
      } else {
        console.error("Error backend:", data);
        setPokemons([]);
      }
    } catch (error) {
      console.error("No se pudieron cargar los Pokemon:", error);
      setPokemons([]);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const clearForm = () => {
    setEditId(null);
    setNombre("");
    setEspecie("");
    setAltura("");
    setPeso("");
    setDescripcion("");
    setGeneracion("");
    setAlert("");
  };

  const savePokemon = async () => {
    if (!nombre || !especie) {
      setAlert("Nombre y especie obligatorios");
      return;
    }

    const payload = {
      nombre,
      especie,
      altura,
      peso,
      descripcion,
      generacion,
    };

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/pokemon/${editId}`
      : `${API_URL}/pokemon`;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      fetchPokemons();
      clearForm();
      setAlert(editId ? "Pokemon actualizado" : "Pokemon agregado");
    } catch (error) {
      console.error("No se pudo guardar el Pokemon:", error);
      setAlert("No se pudo guardar el Pokemon");
    }
  };

  const deletePokemon = async (id) => {
    try {
      await fetch(`${API_URL}/pokemon/${id}`, { method: "DELETE" });
      fetchPokemons();
      setAlert("Pokemon eliminado");
    } catch (error) {
      console.error("No se pudo eliminar el Pokemon:", error);
      setAlert("No se pudo eliminar el Pokemon");
    }
  };

  const editPokemon = (pokemon) => {
    setEditId(pokemon.num_pokedex);
    setNombre(pokemon.nombre || "");
    setEspecie(pokemon.especie || "");
    setAltura(pokemon.altura || "");
    setPeso(pokemon.peso || "");
    setDescripcion(pokemon.descripcion || "");
    setGeneracion(pokemon.generacion || "");
    setAlert(`Editando a ${pokemon.nombre}`);
  };

  const totalPokemons = pokemons.length;
  const speciesCount = new Set(
    pokemons.map((pokemon) => pokemon.especie).filter(Boolean)
  ).size;
  const averageGeneration = totalPokemons
    ? (
        pokemons.reduce(
          (accumulator, pokemon) => accumulator + Number(pokemon.generacion || 0),
          0
        ) / totalPokemons
      ).toFixed(1)
    : "0.0";

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_#dbeafe,_#bfdbfe_22%,_#f8fafc_60%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-r from-sky-500/15 via-indigo-400/15 to-cyan-500/15 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8">
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_20px_80px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.4fr_0.9fr] md:px-8">
            <div>
              <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-700">
                Pokedex Central
              </span>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Todos los Pokemon
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Una vista mas elegante para administrar tu catalogo completo,
                con acciones de editar y eliminar integradas directamente en cada
                tarjeta.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <StatCard label="Registrados" value={totalPokemons} tone="sky" />
                <StatCard label="Especies" value={speciesCount} tone="indigo" />
                <StatCard
                  label="Promedio Gen"
                  value={averageGeneration}
                  tone="emerald"
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-br from-sky-500 via-indigo-400 to-cyan-300 opacity-20 blur-2xl" />
              <div className="relative rounded-[1.75rem] border border-slate-200/70 bg-slate-950 p-6 text-white shadow-2xl">
                <p className="text-sm uppercase tracking-[0.3em] text-sky-200">
                  Panel maestro
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Modo</p>
                    <p className="text-4xl font-black text-cyan-300">
                      {editId ? "EDIT" : "CRUD"}
                    </p>
                  </div>
                  <div className="grid h-20 w-20 place-items-center rounded-full border-4 border-white/10 bg-white/5 text-4xl">
                    P
                  </div>
                </div>
                <p className="mt-6 text-sm leading-6 text-slate-300">
                  Gestiona tu base completa desde un solo lugar con una interfaz
                  mas visual, clara y facil de recorrer.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.45fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
                {editId ? "Modo edicion" : "Nuevo registro"}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {editId ? "Editar Pokemon" : "Agregar Pokemon"}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Completa los datos principales del Pokemon. Puedes actualizar uno
                existente o crear uno nuevo desde el mismo panel.
              </p>
            </div>

            {alert && (
              <div className="mb-5 rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-medium text-sky-700">
                {alert}
              </div>
            )}

            <div className="grid gap-4">
              <Field
                label="Nombre"
                value={nombre}
                onChange={setNombre}
                placeholder="Ej. Pikachu"
              />
              <Field
                label="Especie"
                value={especie}
                onChange={setEspecie}
                placeholder="Ej. Raton"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Altura"
                  value={altura}
                  onChange={setAltura}
                  placeholder="Ej. 0.4 m"
                />
                <Field
                  label="Peso"
                  value={peso}
                  onChange={setPeso}
                  placeholder="Ej. 6.0 kg"
                />
              </div>

              <Field
                label="Generacion"
                value={generacion}
                onChange={setGeneracion}
                placeholder="Ej. 1"
                type="number"
              />

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">
                  Descripcion
                </span>
                <textarea
                  value={descripcion}
                  onChange={(event) => setDescripcion(event.target.value)}
                  placeholder="Describe el Pokemon, su caracter o alguna observacion."
                  rows={4}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </label>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  onClick={savePokemon}
                  className="inline-flex flex-1 items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-sky-600"
                >
                  {editId ? "Actualizar Pokemon" : "Guardar Pokemon"}
                </button>
                <button
                  onClick={clearForm}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">
                  Base completa
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Lista de Pokemon
                </h2>
              </div>
              <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                {totalPokemons} registro{totalPokemons === 1 ? "" : "s"}
              </div>
            </div>

            {pokemons.length === 0 ? (
              <div className="grid min-h-72 place-items-center rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
                <div>
                  <p className="text-lg font-semibold text-slate-700">
                    Aun no hay Pokemon registrados
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Cuando agregues uno, aparecera aqui con su tarjeta y acciones.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {pokemons.map((pokemon, index) => (
                  <article
                    key={pokemon.num_pokedex}
                    className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-50 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div
                      className={`bg-gradient-to-r ${accentColors[index % accentColors.length]} p-5`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-800/60">
                            #{pokemon.num_pokedex}
                          </p>
                          <h3 className="mt-2 text-2xl font-black text-slate-900">
                            {pokemon.nombre || "Sin nombre"}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-slate-800/80">
                            {pokemon.especie || "Especie no definida"}
                          </p>
                        </div>
                        <div className="rounded-full bg-white/55 px-3 py-1 text-sm font-semibold text-slate-800 backdrop-blur">
                          Gen {pokemon.generacion || "-"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 p-5">
                      <div className="grid grid-cols-2 gap-3">
                        <InfoPill label="Altura" value={pokemon.altura || "-"} />
                        <InfoPill label="Peso" value={pokemon.peso || "-"} />
                      </div>

                      <div className="rounded-2xl bg-white p-4 text-sm leading-6 text-slate-600 ring-1 ring-slate-100">
                        {pokemon.descripcion || "Sin descripcion disponible."}
                      </div>

                      <div className="flex gap-3 pt-1">
                        <button
                          onClick={() => editPokemon(pokemon)}
                          className="flex-1 rounded-2xl bg-amber-300 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deletePokemon(pokemon.num_pokedex)}
                          className="flex-1 rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-600"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
      />
    </label>
  );
}

function StatCard({ label, value, tone }) {
  const tones = {
    sky: "bg-sky-50 text-sky-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
      <div
        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${tones[tone]}`}
      >
        {label}
      </div>
      <p className="mt-4 text-3xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function InfoPill({ label, value }) {
  return (
    <div className="rounded-2xl bg-white px-4 py-3 ring-1 ring-slate-100">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-700">{value}</p>
    </div>
  );
}
