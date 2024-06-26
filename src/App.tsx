import "./App.css";

import { useQuery } from "@tanstack/react-query";
import Header from "./components/Header";
import ListBooks from "./ListBooks";
import BorrowBook from "./components/BorrowBooks";

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
      <ListBooks />
      <BorrowBook />
    </>
  );
}

export default App;
