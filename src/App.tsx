import "./App.css";

import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import ListBooks from "./components/ListBooks";
import BorrowBook from "./components/BorrowBooks";
import ListLibrary from "./components/ListLibrary";
import ReturnBook from "./components/ReturnBooks";

function App() {
  const { data } = useQuery({
    queryKey: ["fetch"],
    queryFn: () =>
      fetch("http://localhost:300")
        .then((response) => response.json())
        .then((data) => data.salties),
  });

  return (
    <>
      <Header />
      <ListLibrary />
      <ListBooks />
      <BorrowBook />
      <ReturnBook />
    </>
  );
}

export default App;
