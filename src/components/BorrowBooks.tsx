import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type NewPost = {
  isbn: string;
};

function BorrowBook() {
  const queryClient = useQueryClient();
  const {
    mutate: borrowBook,
    error: putError,
    isPending,
  } = useMutation<unknown, Error, NewPost>({
    mutationFn: (newPost) =>
      fetch("http://localhost:8080/api/books/borrow", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetch"] });
    },
  });

  const [formData, setFormData] = useState({
    isbn: "",
  });

  const [invalidInputError, setError] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { value } = event.target;
    console.log(value);
    setError("");
    setFormData(() => {
      return {
        isbn: value,
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formData.isbn == "") {
      setError("Enter ISBN");
    } else {
      setError("");
      setFormData({
        isbn: "",
      });
      borrowBook({
        isbn: formData.isbn,
      });
    }
  }
  return (
    <>
      <div className="formContainer">
        <h2>Borrow A Book</h2>
        <form id="borrowBookForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="isbnID"
            placeholder="ISBN"
            onChange={handleChange}
            name="isbn"
            className="form__input_isbn"
            value={formData.isbn}
          />
          <br />
          <button className="form__button-borrow">Borrow</button>
          {invalidInputError && (
            <p className="form__error-message">{invalidInputError}</p>
          )}
          {putError && (
            <p className="form__error-message">{`${putError.message} due to server issue. Please try again later`}</p>
          )}
          {isPending && <p>Loading...</p>}
        </form>
      </div>
    </>
  );
}

export default BorrowBook;
