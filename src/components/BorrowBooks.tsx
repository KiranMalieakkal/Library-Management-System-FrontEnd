import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type NewPost = {
  name: string;
};

function BorrowBook() {
  const queryClient = useQueryClient();
  const {
    mutate: postDeveloper,
    error: postError,
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
    const { name, value } = event.target;
    setError("");
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formData.ISBN == "") {
      setError("Enter full name");
    } else {
      setError("");
      setFormData({
        ISBN: "",
      });
      postDeveloper({
        name: formData.ISBN,
      });
    }
  }
  return (
    <>
      <div className="formContainer">
        <h2>Borrow A Book</h2>
        <form id="addDeveloperForm" onSubmit={handleSubmit}>
          <input
            type="text"
            id="fullnameID"
            placeholder="ISBN"
            onChange={handleChange}
            name="fullName"
            className="form__input-name"
            value={formData.ISBN}
          />
          <br />
          <button className="form__button-borrow">Borrow</button>
          {invalidInputError && (
            <p className="form__error-message">{invalidInputError}</p>
          )}
          {postError && (
            <p className="form__error-message">{`${postError.message} due to server issue. Please try again later`}</p>
          )}
          {isPending && <p>Loading...</p>}
        </form>
      </div>
    </>
  );
}

export default BorrowBook;
