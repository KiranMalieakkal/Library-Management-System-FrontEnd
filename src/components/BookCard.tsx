import { BookType } from "./ListBooks";

type Props = {
  book: BookType;
};

function BookCard({ book }: Props) {
  return (
    <div className="book-card">
      <img src={book.url} alt={book.title} className="book-image" />
      <div className="book-details">
        <h2>{book.title}</h2>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
        <p>
          <strong>Library:</strong> {book.library.name}
        </p>
        <p>
          <strong>Available:</strong> {book.available ? "Yes" : "No"}
        </p>
      </div>
    </div>
  );
}

export default BookCard;
