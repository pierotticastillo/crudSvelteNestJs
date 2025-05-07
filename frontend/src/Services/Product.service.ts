// productService.ts
import Swal from 'sweetalert2';
import type { Product } from '../types/Product.interface';

const API_URL = 'http://localhost:3000/products';

export const loadProducts = async (): Promise<Product[]> => {
  const res = await fetch(API_URL);
  if (res.ok) {
    return await res.json();
  } else {
    console.error('Error al cargar los productos:', res.status);
    return [];
  }
};

export const addProduct = async (product: Product): Promise<boolean> => {
  if (product.imageURL && !/^https?:\/\/\S+/.test(product.imageURL)) {
    Swal.fire({
      title: 'Error!',
      text: 'The Image URL is invalid. Please provide a valid URL.',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
    return false;
  }

  const { id, ...productToSend } = product;
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productToSend),
  });

  return res.ok;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this product!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it',
  });

  if (result.isConfirmed) {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    return res.ok;
  }

  return false;
};

export const updateProduct = async (product: Product): Promise<boolean> => {
  const { id, ...productToUpdate } = product;
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productToUpdate),
  });

  return res.ok;
};
