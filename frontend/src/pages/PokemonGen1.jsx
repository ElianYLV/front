import { useEffect, useState } from "react";

export default function PokemonGen1() {
  const [pokemons, setPokemons] = useState([]);
  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [generacion, setGeneracion] = useState("");
  const [editId, setEditId] = useState(null);

  const API_URL = "https://back-ubx7.onrender.com/api";

  const fetchPokemons = async () => {
    const res = await fetch(`${API_URL}/pokemon`);
    const data = await res.json();
    setPokemons(data);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const savePokemon = async () => {
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
      body: JSON.stringify(payload)
    });

    fetchPokemons();
  };

  return (
    <div>
      <input onChange={e => setNombre(e.target.value)} placeholder="nombre"/>
      <input onChange={e => setEspecie(e.target.value)} placeholder="especie"/>
      <input onChange={e => setAltura(e.target.value)} placeholder="altura"/>
      <input onChange={e => setPeso(e.target.value)} placeholder="peso"/>
      <input onChange={e => setGeneracion(e.target.value)} placeholder="generacion"/>
      <input onChange={e => setDescripcion(e.target.value)} placeholder="descripcion"/>

      <button onClick={savePokemon}>Guardar</button>

      {pokemons.map(p => (
        <div key={p.num_pokedex}>
          {p.nombre} - {p.generacion}
        </div>
      ))}
    </div>
  );
}