function FetchData() {
  return fetch("http://localhost:3000/stats")
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      return [];
    });
}

export default FetchData;
