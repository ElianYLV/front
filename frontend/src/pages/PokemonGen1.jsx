import { useEffect, useState } from "react";

export default function PokemonGen1() {

  const [pokemons, setPokemons] = useState([]);

  const [nombre, setNombre] = useState("");
  const [especie, setEspecie] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [generacion, setGeneracion] = useState(""); // 👈 IMPORTANTE

  const API_URL = "https://back-ubx7.onrender.com/api";

  const fetchPokemons = async () => {
    try {
      const res = await fetch(`${API_URL}/pokemon`);
      const data = await res.json();
      setPokemons(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const savePokemon = async () => {
    try {
      await fetch(`${API_URL}/pokemon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          especie,
          altura,
          peso,
          descripcion,
          generacion,
        }),
      });

      fetchPokemons();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>Pokemon</h2>

      <input placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
      <input placeholder="Especie" onChange={e => setEspecie(e.target.value)} />
      <input placeholder="Altura" onChange={e => setAltura(e.target.value)} />
      <input placeholder="Peso" onChange={e => setPeso(e.target.value)} />
      <input placeholder="Generacion" onChange={e => setGeneracion(e.target.value)} />
      <input placeholder="Descripcion" onChange={e => setDescripcion(e.target.value)} />

      <button onClick={savePokemon}>Guardar</button>

      <hr />

      {pokemons.map(p => (
        <div key={p.num_pokedex}>
          {p.nombre} - {p.generacion}
        </div>
      ))}

    </div>
  );
}