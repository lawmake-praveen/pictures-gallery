import { useState, useEffect } from "react";
import { AiOutlineSearch, AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

function App() {
  const [query, setQuery] = useState("");
  const myApiKey = "60thkqe6Xkv5c2tVCGEWFGW3fU7YK1bR7epYCt0mx2CKMUlQyiWLwLYH";
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchData(thisApi) {
    try {
      const response = await fetch(
        thisApi,
        {
          headers: {
            Authorization: myApiKey,
          },
        }
      );
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      alert('Something Went Wrong. Please try again!')        
    }
  }

  useEffect(() => {
    const thisApi = `https://api.pexels.com/v1/search?query=random&per_page=30`
    fetchData(thisApi);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const thisApi = `https://api.pexels.com/v1/search?query=${query}&per_page=30`
    fetchData(thisApi);
  }
  function handlePreviousPage() {
    setCurrentPage((prevPage) => prevPage - 1);
    const thisApi = `https://api.pexels.com/v1/search/?page=${currentPage - 1}&per_page=30&query=${query}`
    fetchData(thisApi)
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => prevPage + 1);
    const thisApi = `https://api.pexels.com/v1/search/?page=${currentPage + 1}&per_page=30&query=${query}`
    fetchData(thisApi)
  }

  return (
    <>
      <h1>Pictures App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          id="search-pictures"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Pictures"
        />
        <button type="submit">
          <AiOutlineSearch className="search-icon" />
        </button>
      </form>
      <main className="pic-container">
      {data && data.photos.length > 0 ? (
          <>
            {data.photos.map((photo) => (
              <div key={photo.id}>
                <a href={photo.photographer_url} target="_blank">
                  <img src={photo.src.portrait} title={photo.photographer} />
                </a>
              </div>
            ))}
            <div className="pagination">
              {currentPage > 1 && (
                <button onClick={handlePreviousPage}><AiFillCaretLeft /></button>
              )}
              <span>{currentPage}</span>
              {currentPage < data.total_results / 20 && (
                <button onClick={handleNextPage}><AiFillCaretRight /></button>
              )}
            </div>
          </>
        ) : (
          <p>Search Gallery</p>
        )}
      </main>
    </>
  );
}

export default App;
