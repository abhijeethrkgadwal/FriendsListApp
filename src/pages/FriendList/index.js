import { useState, useEffect } from "react";
import ListRow from "../../components/ListRow";
import "./index.css";

const PER_PAGE_DATA = 4;

function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputArray, setInputArray] = useState([]);
  const [favArray, setFavArray] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [tmpInputArray, setTmpInputArray] = useState([]);

  const handleEnter = (inputValue) => {
    if (inputValue.trim().length > 0) {
      setTmpInputArray([
        ...tmpInputArray,
        { id: Date.now(), name: inputValue, favourite: false },
      ]);
      setInputValue("");
    }
  };

  const handleDelete = (id) => {
    const factoredArray = tmpInputArray.filter((item) => {
      return item.id !== id;
    });
    setTmpInputArray(factoredArray);
  };

  const [clickFav, setClickFav] = useState(false);
  const handleFavourite = (id) => {
    const refactoredArray = inputArray.map((item) => {
      if (item.id === id) {
        item.favourite = item.favourite ? false : true;
        return item;
      } else {
        return item;
      }
    });
    setInputArray(refactoredArray);
  };

  const sortFavArray = () => {
    const sortedArray = inputArray.sort((x, y) => {
      return x.favourite === y.favourite ? 0 : x.favourite ? -1 : 1;
    });
    setFavArray(sortedArray);
    setClickFav(true);
  };

  useEffect(() => {
    setInputArray(tmpInputArray.slice(0, 4));
    setPageNo(1);
  }, [tmpInputArray]);

  const next = () => {
    const nextPageData = tmpInputArray.slice(
      pageNo * PER_PAGE_DATA,
      (pageNo + 1) * PER_PAGE_DATA
    );
    console.log(nextPageData);
    setInputArray(nextPageData);
    setPageNo(pageNo + 1);
  };

  const prev = () => {
    const prevPageData = tmpInputArray.slice(
      (pageNo - 2) * PER_PAGE_DATA,
      (pageNo - 1) * PER_PAGE_DATA
    );
    setInputArray(prevPageData);
    setPageNo(pageNo - 1);
  };

  const [searchArray, setSearchArray] = useState([]);
  const [clickSearch, setClickSearch] = useState(false);

  const handleSearch = () => {
    if (inputValue.trim().length > 0) {
      const searchList = inputArray.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSearchArray(searchList);
      setClickSearch(true);
    }
  };
  const [clickReset, setClickReset] = useState(false);
  const [initialArray, setIntialArray] = useState(true);

  const handleReset = () => {
    setClickReset(true);
    setClickSearch(false);
    setClickFav(false);
    setIntialArray(false);
    const ogArray = inputArray.sort((x, y) => x.id - y.id);
    setInputArray(ogArray);
  };

  return (
    <div className="main-card">
      <div className="title" data-testid="titleTest">
        <h3>Friends List</h3>
      </div>
      <div className="input-field" data-testid="inputfieldTest">
        <input
          type="text"
          placeholder="Enter your friend's name"
          maxLength={15}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyPress={(e) => e.key === "Enter" && handleEnter(inputValue)}
          value={inputValue}
        />
        <button onClick={handleSearch}>Click to Search</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={sortFavArray}>Sort by Fav <span style={{fontSize:"10px"}}>★</span> </button>
      </div>
      {!clickSearch &&
        !clickFav &&
        initialArray &&
        inputArray.map((item, index) => {
          return (
            <>
              <div key={index}>
                <ListRow
                  id={item.id}
                  name={item.name}
                  deleteRow={handleDelete}
                  makeFavourite={handleFavourite}
                  isFavourite={item.favourite}
                />
              </div>
            </>
          );
        })}
      {clickSearch && searchArray.length
        ? searchArray.map((item, index) => {
            return (
              <>
                <div key={index}>
                  <ListRow
                    id={item.id}
                    name={item.name}
                    deleteRow={handleDelete}
                    makeFavourite={handleFavourite}
                    isFavourite={item.favourite}
                  />
                </div>
              </>
            );
          })
        : clickSearch &&
          !searchArray.length && (
            <div className="no-item">
              <div className="no-item-name">No match found!!!</div>
            </div>
          )}
      {clickFav &&
        !clickSearch &&
        favArray.map((item, index) => {
          return (
            <>
              <div key={index}>
                <ListRow
                  id={item.id}
                  name={item.name}
                  deleteRow={handleDelete}
                  makeFavourite={handleFavourite}
                  isFavourite={item.favourite}
                />
              </div>
            </>
          );
        })}
      {clickReset &&
        !initialArray &&
        !clickFav &&
        !clickSearch &&
        inputArray.map((item, index) => {
          return (
            <>
              <div key={index}>
                <ListRow
                  id={item.id}
                  name={item.name}
                  deleteRow={handleDelete}
                  makeFavourite={handleFavourite}
                  isFavourite={item.favourite}
                />
              </div>
            </>
          );
        })}
      {tmpInputArray.length > 4 && (
        <div className="pagination">
          <button
            disabled={
              tmpInputArray.length <= 4 ||
              pageNo * PER_PAGE_DATA > tmpInputArray.length - 1
            }
            onClick={() => next()}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <button disabled={pageNo === 1} onClick={() => prev()}>
            <i className="fas fa-chevron-left"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
