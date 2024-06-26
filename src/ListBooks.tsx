function ListBooks() {
  function handleClick() {
    console.log("button clicked");
  }
  return (
    <>
      <h2>Available Books</h2>
      <button onClick={handleClick}>List Available Books</button>
    </>
  );
}

export default ListBooks;
