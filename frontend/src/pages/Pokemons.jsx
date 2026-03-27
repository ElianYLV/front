import { useEffect, useState } from "react";

export default function Pokemons() {
  const [pokemons, setPokemons] = useState([]);
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [generacion, setGeneracion] = useState("");
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState("");

  const API_URL = `${import.meta.env.VITE_API_URL}/api/pokemon`;

  const fetchPokemons = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (Array.isArray(data)) {
      setPokemons(data);
    } else {
      console.error("Error backend:", data);
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
  };

  const savePokemon = async () => {
    if (!nombre || !especie) {
      setAlert("Nombre y especie son obligatorios");
      return;
    }

    const payload = { nombre, especie, altura, peso, descripcion, generacion };

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/${editId}` : API_URL;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    fetchPokemons();
    clearForm();
    setAlert(editId ? "Actualizado" : "Agregado");
  };

  const deletePokemon = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchPokemons();
    setAlert("Eliminado");
  };

  const editPokemon = (p) => {
    setEditId(p.num_pokedex);
    setNombre(p.nombre);
    setEspecie(p.especie);
    setAltura(p.altura);
    setPeso(p.peso);
    setDescripcion(p.descripcion);
    setGeneracion(p.generacion);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto p-6 bg-white/80 backdrop-blur rounded-2xl shadow-2xl border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">{editId ? "Editar" : "Pokémons"}</h1>
            <p className="text-sm text-slate-600">Administra pokémons con tabla de datos y acciones.</p>
          </div>
          <button
            onClick={clearForm}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow hover:bg-emerald-700 transition"
          >
            Nuevo Pokemon
          </button>
        </div>

        {alert && <div className="mb-4 rounded-lg px-3 py-2 bg-amber-100 text-amber-900 border border-amber-200">{alert}</div>}

        <div className="grid gap-4 lg:grid-cols-[1fr_2fr] mb-6">
          <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-700">Formulario</h2>
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <input
              value={especie}
              onChange={(e) => setEspecie(e.target.value)}
              placeholder="Especie"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Altura"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <input
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="Peso"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            <input
              value={generacion}
              onChange={(e) => setGeneracion(e.target.value)}
              placeholder="Generación"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción"
              rows={3}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <div className="flex gap-2">
              <button
                onClick={savePokemon}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                {editId ? "Actualizar" : "Guardar"}
              </button>
              <button
                onClick={clearForm}
                className="flex-1 px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition"
              >
                Limpiar
              </button>
            </div>
          </div>

          <div>
            <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
              <table className="min-w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Especie</th>
                    <th className="px-4 py-2">Altura</th>
                    <th className="px-4 py-2">Peso</th>
                    <th className="px-4 py-2">Generación</th>
                    <th className="px-4 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pokemons.length === 0 ? (
                    <tr><td className="px-4 py-4" colSpan={7}>No hay pokémons.</td></tr>
                  ) : (
                    pokemons.map((p) => (
                      <tr key={p.num_pokedex} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium">{p.num_pokedex}</td>
                        <td className="px-4 py-3">{p.nombre}</td>
                        <td className="px-4 py-3">{p.especie}</td>
                        <td className="px-4 py-3">{p.altura}</td>
                        <td className="px-4 py-3">{p.peso}</td>
                        <td className="px-4 py-3">{p.generacion}</td>
                        <td className="px-4 py-3 space-x-2">
                          <button
                            onClick={() => editPokemon(p)}
                            className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-xs"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deletePokemon(p.num_pokedex)}
                            className="px-2 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 text-xs"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
