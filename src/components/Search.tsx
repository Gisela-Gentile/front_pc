

export default function Search() {
  return (
<nav className="navbar bg-body-tertiary">
  <div className="container-fluid justify-content-center ">
    <form className="d-flex" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Buscar..."/>
      <button className="btn btn-outline-success" type="submit">Buscar</button>
    </form>
  </div>
</nav>
  )
}
// import { useState } from 'react';

// function Search() {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`/api/search?query=${query}`);
//       if (response.ok) {
//         const data = await response.json();
//         setResults(data);
//       }
//     } catch (error) {
//       console.error('Error en la búsqueda:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Buscar..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Buscar</button>

//       <ul>
//         {results.map((result) => (
//           <li key={result.id}>{result.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Search;
