<template>
  <div id="page-wrap" v-if="product">
    <div id="img-wrap">
      <img v-bind:src="product.imageUrl" />
    </div>
    <div id="product-details">
      <h1>{{ product.name }}</h1>
      <h3 id="price">Q{{ product.price }}</h3>
      <p>Puntaje Promedio: {{ product.averageRating }}</p>
      <button
        id="add-to-cart"
        v-if="!itemIsInCart && !showSuccessMessage"
        v-on:click="addToCart"
      >Añadir al carrito</button>
      <button
        id="add-to-cart"
        class="green-button"
        v-if="!itemIsInCart && showSuccessMessage"
      >Añadido correctamente!</button>
      <button
        id="add-to-cart"
        class="grey-button"
        v-if="itemIsInCart"
      >Este producto ya está en el carrito</button>
      <h4>Descripcion</h4>
      <p>{{ product.description }}</p>
    </div>
  </div>
  <NotFoundPage v-else/>
</template>
  
<script>
import axios from 'axios';
import NotFoundPage from './NotFoundPage';

export default {
    name: 'ProductDetailPage',
    components: {
      NotFoundPage,
    },
    data() {
      return {
        product: {},
        cartItems: [],
        showSuccessMessage: false,
      };
    },
    computed: {
      itemIsInCart() {
        return this.cartItems.some(item => item.id === this.product.id);
      }
    },
    methods: {
      async addToCart() {
        await axios.post('/api/users/12345/cart', {
          productId: this.$route.params.id,
        });
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.$router.push('/products');
        }, 1500);
      },
    },
    async created() {
      const { data: product } = await axios.get(`/api/products/${this.$route.params.id}`);
      this.product = product;

      const { data: cartItems } = await axios.get('/api/users/12345/cart');
      this.cartItems = cartItems;
    }
};
</script>

<style scoped>
  #page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
  }

  #img-wrap {
    text-align: center;
  }

  img {
    width: 400px;
  }

  #product-details {
    padding: 16px;
    position: relative;
  }

  #add-to-cart {
    width: 100%;
  }

  #price {
    position: absolute;
    top: 24px;
    right: 16px;
  }

  .green-button {
    background-color: green;
  }

  .grey-button {
    background-color: #888;
  }
</style>
