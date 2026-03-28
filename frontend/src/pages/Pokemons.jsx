import { useEffect, useState } from "react";

export default function PokemonGen1() {
  const [pokemons, setPokemons] = useState([]);
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState("");
  const [generacion, setGeneracion] = useState("");

  // ✅ BASE CORRECTA (NO pongas /pokemon aquí)
  const API_URL = "https://back-ubx7.onrender.com/api";

  // GET
  const fetchPokemons = async () => {
    const res = await fetch(`${API_URL}/pokemon`);
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

  // LIMPIAR
  const clearForm = () => {
    setEditId(null);
    setNombre("");
    setEspecie("");
    setAltura("");
    setPeso("");
    setDescripcion("");
  };

  // GUARDAR
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
  generacion
};

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_URL}/pokemon/${editId}`
      : `${API_URL}/pokemon`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    fetchPokemons();
    clearForm();
    setAlert(editId ? "Actualizado" : "Agregado");
  };

  // ELIMINAR
  const deletePokemon = async (id) => {
    await fetch(`${API_URL}/pokemon/${id}`, { method: "DELETE" });
    fetchPokemons();
    setAlert("Eliminado");
  };

  // EDITAR
  const editPokemon = (p) => {
    setEditId(p.num_pokedex);
    setNombre(p.nombre);
    setEspecie(p.especie);
    setAltura(p.altura);
    setPeso(p.peso);
    setDescripcion(p.descripcion);
  };


  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-sky-100 to-indigo-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-4">
          {editId ? "Editar Pokémon" : "Pokémons"}
        </h1>

        {alert && (
          <div className="mb-4 bg-yellow-100 p-2 rounded">{alert}</div>
        )}

        {/* FORM */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" className="border p-2 rounded" />
          <input value={especie} onChange={e => setEspecie(e.target.value)} placeholder="Especie" className="border p-2 rounded" />
          <input value={altura} onChange={e => setAltura(e.target.value)} placeholder="Altura" className="border p-2 rounded" />
          <input value={peso} onChange={e => setPeso(e.target.value)} placeholder="Peso" className="border p-2 rounded" />
          <input value={generacion} onChange={e => setGeneracion(e.target.value)} placeholder="Generación" className="border p-2 rounded" />
          <input value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" className="border p-2 rounded" />
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={savePokemon} className="bg-blue-600 text-white px-4 py-2 rounded">
            {editId ? "Actualizar" : "Guardar"}
          </button>
          <button onClick={clearForm} className="bg-gray-400 px-4 py-2 rounded">
            Limpiar
          </button>
        </div>

        {/* TABLA */}
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>Gen</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {pokemons.map((p) => (
              <tr key={p.num_pokedex} className="border-t text-center">
                <td>{p.num_pokedex}</td>
                <td>{p.nombre}</td>
                <td>{p.especie}</td>
                <td>{p.altura}</td>
                <td>{p.peso}</td>
                <td>{p.generacion}</td>
                <td>
                  <button onClick={() => editPokemon(p)} className="bg-yellow-400 px-2 mr-2 rounded">
                    Editar
                  </button>
                  <button onClick={() => deletePokemon(p.num_pokedex)} className="bg-red-500 text-white px-2 rounded">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}