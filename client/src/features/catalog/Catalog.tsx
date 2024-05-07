import { Product } from "../../app/models/products";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

// interface Props{ // we made that this props are required
//     products:Product[];
//     addProduct: () => void;
// }

//функція каталог приймає пропси типу Пропс(тобто список продуктів і ф-цію войд)
//можна так писати,а можна написати конкретно які пропси нас цікавлять
//export default function Catalog(props: Props) { //any - TypeScript не буде перевіряти типи даних для props і product, і ви зможете використовувати будь-які властивості або методи з них
//2 рішення
export default function Catalog() { //деструктуризація пропсів
  //setState викликає rerender
  const [products,setProducts]=useState<Product[]>([]);

  useEffect(()=>{
    fetch('http://localhost:5000/api/products')
    .then(response=>response.json())
    .then(data=>setProducts(data))
  },[])

  // function addProduct(){
  //   //setProducts([...products,{name:"product",price:300.00};
  //   setProducts(prevState=>[...prevState,
  //     {
  //       id:prevState.length+101,
  //       name:"product"+(prevState.length+1),
  //       price:(prevState.length*100)+100,
  //       brand:'some brand',
  //       description:'some description',
  //       pictureUrl:'http://picsum.photos/200'
  //     }]);
  // }
  return (
    <>
      <ProductList products={products}/>
    </>
  );
}

// <> це аналог використання <Fragment> , означає шо від реакт компонента буде повернутий 1 фрагмент
/* <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>Add Product</button> */