import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";

type NewPost = {
  title: string;
  author: string;
  isbn: string;
  description: string;
  url: string;
  library_id: number;
};

function AddBooks() {
  const queryClient = useQueryClient();
  const {
    mutate: returnBook,
    error: putError,
    isPending,
  } = useMutation<unknown, Error, NewPost>({
    mutationFn: (newPost) =>
      fetch("http://localhost:8080/api/books", {
        method: "POST",
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
    title: "",
    author: "",
    isbn: "",
    description: "",
    url: "",
    library_id: -1,
  });

  const [invalidInputError, setError] = useState("");

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { value, name } = event.target;
    console.log(value);
    setError("");
    setFormData((prevformData) => {
      return {
        ...prevformData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(formData);
    returnBook(formData);
  }

  return (
    <>
      <div className="formContainer">
        <h2>Add A Book</h2>
        <form id="addBookForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="titleID"
            placeholder="Title"
            onChange={handleChange}
            name="title"
            className="form__input_title"
            value={formData.title}
          />
          <br />
          <input
            type="text"
            id="authorID"
            placeholder="Author"
            onChange={handleChange}
            name="author"
            className="form__input_author"
            value={formData.author}
          />
          <br />
          <input
            type="text"
            id="decriptionID"
            placeholder="Description"
            onChange={handleChange}
            name="description"
            className="form__input_description"
            value={formData.description}
          />
          <br />
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
          <br />
          <input
            type="text"
            id="urlID"
            placeholder="Image url"
            onChange={handleChange}
            name="url"
            className="form__input_url"
            value={formData.url}
          />
          <br />
          <input
            type="text"
            id="libID"
            placeholder="Library ID"
            onChange={handleChange}
            name="library_id"
            className="form__input_libid"
            value={formData.library_id}
          />
          <br />
          <button className="form__button-return">Add</button>
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

export default AddBooks;
