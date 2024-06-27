function ListBooks() {
  function handleClick() {
    console.log("button clicked");
  }
  return (
    <>
      <div className="container">
        <h2>Available Books</h2>
        <button onClick={handleClick}>List Available Books</button>
      </div>
    </>
  );
}

export default ListBooks;
