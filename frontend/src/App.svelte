<script lang="ts">
  import { onMount } from 'svelte';
  import Swal from 'sweetalert2';
  import type { Product } from './types/Product.interface';
  import {
    loadProducts,
    addProduct,
    deleteProduct,
    updateProduct,
  } from './Services/Product.service';

  let products: Product[] = [];
  let product: Product = {
    id: '',
    name: '',
    description: '',
    category: '',
    imageURL: '',
  };

  let editStatus = false;

  const load = async () => {
    products = await loadProducts();
  };

  onMount(() => {
    load();
  });

  const cleanProduct = (): void => {
    product = {
      id: '',
      name: '',
      description: '',
      category: '',
      imageURL: '',
    };
  };

  const addNewProduct = async (): Promise<void> => {
    const success = await addProduct(product);
    if (success) {
      await load();
      cleanProduct();
      Swal.fire({
        title: 'Success!',
        text: 'Product added successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add product.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const deleteProductHandler = async (id: string): Promise<void> => {
    const success = await deleteProduct(id);
    if (success) {
      await load();
      Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
    } else {
      Swal.fire('Error!', 'Failed to delete product.', 'error');
    }
  };

  const editProductHandler = (productEdited: Product): void => {
    editStatus = true;
    product = { ...productEdited };
  };
  const cancelHandler = (): void => {
    const wasEditing = editStatus;
    cleanProduct();
    editStatus = false;

    Swal.fire({
      title: wasEditing ? 'Edit cancelled' : 'Form cleared',
      icon: 'info',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const updateProductHandler = async (): Promise<void> => {
    const success = await updateProduct(product);
    if (success) {
      await load();
      cleanProduct();
      editStatus = false;
      Swal.fire({
        title: 'Success!',
        text: 'Product updated successfully!',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update product.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const onSubmitHandler = async (): Promise<void> => {
    if (!editStatus) {
      await addNewProduct();
    } else {
      await updateProductHandler();
    }
  };
</script>

<main>
  <div class="container py-4">
    <div class="row g-4">
      <div class="col-lg-6">
        <h3 class="mb-3">Products</h3>
        {#each products as product}
          <div class="card shadow-sm border-0 rounded-4 mb-3">
            <div class="row g-0">
              <div
                class="col-md-4 d-flex align-items-center justify-content-center p-2"
              >
                <img
                  src={product.imageURL || 'images/no-product.png'}
                  class="img-fluid rounded-3"
                  alt={product.name}
                  style="max-height: 120px; object-fit: cover;"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{product.name}</h5>
                  <p class="card-subtitle text-muted mb-2">
                    {product.category}
                  </p>
                  <p class="card-text">{product.description}</p>
                  <div class="d-flex gap-2">
                    <button
                      class="btn btn-outline-danger btn-sm"
                      on:click={() => deleteProductHandler(product.id)}
                    >
                      <i class="fas fa-trash-alt"></i> Delete
                    </button>
                    <button
                      class="btn btn-outline-secondary btn-sm"
                      on:click={() => editProductHandler(product)}
                    >
                      <i class="fas fa-edit"></i> Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <div class="col-lg-6">
        <div class="card border-0 shadow rounded-4">
          <div class="card-header bg-primary text-white rounded-top-4">
            <h4 class="mb-0">
              {editStatus ? 'Update Product' : 'Add Product'}
            </h4>
          </div>
          <div class="card-body">
            <form on:submit|preventDefault={onSubmitHandler} class="row g-3">
              <div class="col-12">
                <label class="form-label" for="product-name">Product Name</label>
                <input
                  bind:value={product.name}
                  type="text"
                  class="form-control"
                  id="product-name"
                  placeholder="Product Name"
                  required
                />
              </div>
              <div class="col-12">
                <label class="form-label" for="product-description">Description</label>
                <textarea
                  bind:value={product.description}
                  id="product-description"
                  rows="3"
                  class="form-control"
                  placeholder="Product Description"
                ></textarea>
              </div>
              <div class="col-12">
                <label class="form-label" for="product-image-url">Image URL</label>
                <input
                  bind:value={product.imageURL}
                  type="url"
                  id="product-image-url"
                  class="form-control"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div class="col-12">
                <label class="form-label" for="category">Category</label>
                <select
                  id="category"
                  class="form-select"
                  bind:value={product.category}
                  required
                >
                  <option disabled selected>Select a Category</option>
                  <option value="laptops">Laptops</option>
                  <option value="peripherals">Peripherals</option>
                  <option value="servers">Servers</option>
                </select>
              </div>
              <div class="col-12 d-flex gap-2">
                <button type="submit" class="btn btn-success w-100">
                  {editStatus ? 'Update Product' : 'Save Product'}
                </button>
                <button
                  type="button"
                  class="btn btn-outline-secondary w-100"
                  on:click={cancelHandler}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
  main {
    background-color: #f8f9fa;
    min-height: 100vh;
  }

  .card {
    transition: transform 0.2s ease-in-out;
  }

  .card:hover {
    transform: translateY(-4px);
  }

  img {
    max-width: 100%;
    border-radius: 12px;
  }
</style>
