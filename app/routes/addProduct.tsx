import React, { useState } from 'react'

type Props = {}

export default function AddProduct({}: Props) {
    const [product, setProduct] = useState({
        title: '',
        body_html: '',
        vendor: '',
        product_type: '',
      });
    
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
      };
  return (
    <div>
    <form onSubmit={async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3001/add-product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json();
          console.log('Product created:', data);
        } catch (error) {
          console.error('Error:', error);
        }
      }}>
      <div>
        <label>Title</label>
        <input type="text" name="title" value={product.title} onChange={handleChange} />
      </div>
      <div>
        <label>Body HTML</label>
        <textarea name="body_html" value={product.body_html} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Vendor</label>
        <input type="text" name="vendor" value={product.vendor} onChange={handleChange} />
      </div>
      <div>
        <label>Product Type</label>
        <input type="text" name="product_type" value={product.product_type} onChange={handleChange} />
      </div>
      <button type="submit">Add Product</button>
    </form>
    </div>
  )
}