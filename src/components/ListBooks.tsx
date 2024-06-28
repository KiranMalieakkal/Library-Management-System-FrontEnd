import { useEffect, useState } from "react";
import BookCard from "./BookCard";

export type Library = {
  id: number;
  name: string;
};

export type BookType = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description: string;
  url: string;
  available: boolean;
  library: Library;
};

type Props = {
  data: BookType[];
};

function ListBooks({ data }: Props) {
  const [books, setBooks] = useState<BookType[]>([]);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    setBooks(data);
  }, [data]);

  const bookCards = books?.map((book) => {
    return <BookCard book={book} />;
  });

  function handleClick() {
    console.log("button clicked");
    setDisplay(!display);
  }
  return (
    <>
      <div className="container">
        <h2>Available Books</h2>
        <button onClick={handleClick}>List Available Books</button>
        {display && <div className="cardContainer">{bookCards}</div>}
      </div>
    </>
  );
}

export default ListBooks;
