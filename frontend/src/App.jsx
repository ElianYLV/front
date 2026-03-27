import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Pokemons from "./pages/Pokemons";
import PokemonGen1 from "./pages/PokemonGen1";

function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("pokemons");

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setUser({ token });
  }
}, []);

  return (
    <>
      {user ? (
        <div>
          <nav className="bg-gradient-to-r from-indigo-700 to-indigo-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-white text-2xl font-bold">Pokedex Manager</h1>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setUser(null);
                  }}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition"
                >
                  Cerrar sesión
                </button>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => setActiveTab("pokemons")}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    activeTab === "pokemons"
                      ? "bg-white text-indigo-700"
                      : "bg-indigo-600 text-white hover:bg-indigo-500"
                  }`}
                >
                  Todos los Pokémons
                </button>
                <button
                  onClick={() => setActiveTab("gen1")}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    activeTab === "gen1"
                      ? "bg-white text-indigo-700"
                      : "bg-indigo-600 text-white hover:bg-indigo-500"
                  }`}
                >
                  Pokémon Gen 1
                </button>
              </div>
            </div>
          </nav>
          {activeTab === "pokemons" && <Pokemons user={user} setUser={setUser} hideLogout />}
          {activeTab === "gen1" && <PokemonGen1 user={user} />}
        </div>
      ) : (
        <Login setUser={setUser} />
      )}
    </>
  );
}

export default App;