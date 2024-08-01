// import { Fragment } from "react/jsx-runtime";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent.ts";
import LoadingComponent from "../../app/layout/LoadingComponent.tsx";


export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,setLoading]=useState(true);
  
  
  useEffect(() => {
    // fetch("http://localhost:5001/api/products")
    //   .then((response) => response.json())
    //   .then((data) => setProducts(data));
    
    agent.Catalog.list()
        .then(products=>setProducts(products))
        .catch(error=>console.log(error))
        .finally(()=>setLoading(false));
  }, []);

  if(loading) return <LoadingComponent message='Loading products...'/>
 
  
  return (
    <>
     <ProductList products={products}/>
    </>
  );
}