import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type NewPost = {
  ISBN: string;
};

function ReturnBook() {
  const queryClient = useQueryClient();
  const {
    mutate: returnBook,
    error: putError,
    isPending,
  } = useMutation<unknown, Error, NewPost>({
    mutationFn: (newPost) =>
      fetch("http://localhost:300", {
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
    ISBN: "",
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
        ISBN: value,
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formData.ISBN == "") {
      setError("Enter ISBN");
    } else {
      setError("");
      setFormData({
        ISBN: "",
      });
      returnBook({
        ISBN: formData.ISBN,
      });
    }
  }
  return (
    <>
      <div className="formContainer">
        <h2>Retrun A Book</h2>
        <form id="returnBookForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="isbnID"
            placeholder="ISBN"
            onChange={handleChange}
            name="ISBN"
            className="form__input_isbn"
            value={formData.ISBN}
          />
          <br />
          <button className="form__button-return">Return</button>
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

export default ReturnBook;
