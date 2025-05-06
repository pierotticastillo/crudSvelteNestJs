<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import Noty from 'noty';
  import 'noty/lib/noty.css';
  import Swal from 'sweetalert2';

  // Tipos
  interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    imageURL: string;
  }

  let products: Product[] = [
    {
      id: '1',
      name: 'Hp Pavilion Notebook',
      description: 'HP Laptop',
      category: 'laptops',
      imageURL: '',
    },
    {
      id: '2',
      name: 'Razer Mouse',
      description: 'Gaming Mouse',
      category: 'peripherals',
      imageURL: '',
    },
    {
      id: '3',
      name: 'Corsair Keyboard',
      description: 'Gaming keyboard',
      category: 'peripherals',
      imageURL: '',
    },
    {
      id: '4',
      name: 'Dell Server',
      description: 'Dell Server',
      category: 'servers',
      imageURL: '',
    },
    {
      id: '5',
      name: 'Asus Laptop',
      description: 'Asus Laptop',
      category: 'laptops',
      imageURL: '',
    },
    {
      id: '6',
      name: 'Logitech Mouse',
      description: 'Logitech Mouse',
      category: 'peripherals',
      imageURL: '',
    },
    {
      id: '7',
      name: 'Lenovo Server',
      description: 'Lenovo Server',
      category: 'servers',
      imageURL: '',
    },
  ];

  let product: Product = {
    id: '',
    name: '',
    description: '',
    category: '',
    imageURL: '',
  };

  let editStatus = false;

  const cleanProduct = (): void => {
    product = {
      id: '',
      name: '',
      description: '',
      category: '',
      imageURL: '',
    };
  };

  const addProduct = (): void => {
    const newProduct: Product = {
      id: uuidv4(),
      name: product.name,
      description: product.description,
      category: product.category,
      imageURL: product.imageURL,
    };

    products = [...products, newProduct];
    cleanProduct();

    // Mostrar alerta de éxito con SweetAlert2
    Swal.fire({
      title: 'Success!',
      text: 'Product added successfully!',
      icon: 'success',
      confirmButtonText: 'Ok',
    });
  };

  const deleteProduct = (id: string): void => {
    // Usamos SweetAlert2 para la confirmación
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminar el producto
        products = products.filter((p) => p.id !== id);

        // Mostrar un mensaje de éxito con SweetAlert2
        Swal.fire('Deleted!', 'Your product has been deleted.', 'success');
      }
    });
  };
  const editProduct = (productEdited: Product): void => {
    editStatus = true;
    product = { ...productEdited };
  };

  const updateProduct = (): void => {
    const updatedProduct: Product = {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      imageURL: product.imageURL,
    };

    const index = products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      products[index] = updatedProduct;
    }

    // Mostrar alerta de éxito con SweetAlert2
    Swal.fire({
      title: 'Success!',
      text: 'Product updated successfully!',
      icon: 'success',
      confirmButtonText: 'Ok',
    });

    cleanProduct();
    editStatus = false;
  };

  const onSubmitHandler = (): void => {
    if (!editStatus) {
      addProduct();
    } else {
      updateProduct();
    }
  };
</script>

<main>
  <div class="container p-4">
    <div class="row">
      <div class="col-md-6">
        {#each products as product}
          <div class="card mt-2 animate__animated animate__backInLeft">
            <div class="row">
              <div class="col-md-4">
                {#if !product.imageURL}
                  <img
                    src="images/no-product.png"
                    class="p-2 img-fluid"
                    alt=""
                  />
                {:else}
                  <img src={product.imageURL} class="p-2 img-fluid" alt="" />
                {/if}
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    <strong>{product.name}</strong>
                    <span>
                      <small>{product.category}</small>
                    </span>
                  </h5>
                  <p class="card-text">{product.description}</p>
                  <button
                    class="btn btn-danger"
                    on:click={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                  <button
                    class="btn btn-secondary"
                    on:click={() => editProduct(product)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">
              {#if !editStatus}Add Product{:else}Update Product{/if}
            </h2>
            <form on:submit|preventDefault={onSubmitHandler}>
              <div class="form-group">
                <label for="product-name">Product Name</label>
                <input
                  bind:value={product.name}
                  type="text"
                  class="form-control"
                  id="product-name"
                  placeholder="Product Name"
                />
              </div>

              <div class="form-group">
                <label for="product-description">Product Description</label>
                <textarea
                  bind:value={product.description}
                  id="product-description"
                  rows="3"
                  class="form-control"
                  placeholder="Product Description"
                ></textarea>
              </div>

              <div class="form-group">
                <label for="produtc-image-url">Product Image URL</label>
                <input
                  bind:value={product.imageURL}
                  type="url"
                  id="product-image-url"
                  class="form-control"
                  placeholder="https://faztweb.com"
                />
              </div>

              <div class="form-group">
                <label for="category">Product Category</label>
                <select
                  id="category"
                  class="form-control"
                  bind:value={product.category}
                >
                  <option selected disabled>Select a Category</option>
                  <option value="laptops">Laptops</option>
                  <option value="peripherals">Peripherals</option>
                  <option value="servers">Servers</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary mt-3">
                {#if !editStatus}Save Product{:else}Update Product{/if}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<style>
</style>
