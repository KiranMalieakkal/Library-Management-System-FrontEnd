import { useState, ChangeEvent } from "react";

function ListLibrary() {
  const [filterData, setFilterData] = useState({
    library: "all",
  });

  function handleFilterChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    console.log("the value is " + value);
    setFilterData(() => {
      return {
        library: value,
      };
    });
    console.log(filterData);
  }
  return (
    <>
      <div className="filterContainer">
        <h2>Library List</h2>
        <div className="filterDropdown">
          <label htmlFor="library">Filter</label>
          <br />
          <select
            className="gallery__filter-select-library"
            id="library"
            value={filterData.library}
            onChange={handleFilterChange}
            name="library"
          >
            <option value="all">All</option>
            <option value="lib1">Library 1</option>
            <option value="lib2">Library 2</option>
            <option value="lib3">Library 3</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default ListLibrary;
