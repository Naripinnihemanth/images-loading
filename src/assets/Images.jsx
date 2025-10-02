import { useState, useEffect } from "react";
import "./Images.css";
import { prerenderToNodeStream } from "react-dom/static";
function Images() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(20);
  function fetchData() {
    fetch(`https://dummyjson.com/products?limit=${count}`)
      .then((res) => res.json())
      .then((data) => {
        data && data.products && data.products.length
          ? setProducts(data.products)
          : console.log("products not avilable");
      });
  }

  useEffect(fetchData, [count]);
  return (
    <div className="container">
      <div className="products">
        {products && products.length > 0 ? (
          products.map((item) => (
            <div className="product" key={item.id}>
              <img src={item.thumbnail} alt={item.title} />
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>NULL</p>
        )}
      </div>
      <button
        disabled={count == 100 ? true : false}
        onClick={() => setCount(count + 20)}
      >
        load more
      </button>
      {count == 100 ? "You reached 100 products !" : null}
    </div>
  );
}

export default Images;
