document.addEventListener("alpine:init", async () => {
  Alpine.store("getCategories", {
    url: "http://localhost:3000/categories",
    categories: [],

    getAllCategories() {
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => (this.categories = data));
    },
  });

  // Funciona
  // Alpine.store("getProducts", {
  //   url: "http://localhost:3000/products",
  //   products: [],
  //   getAllProducts() {
  //     fetch(this.url)
  //       .then((response) => response.json())
  //       .then((data) => (this.products = data));
  //   },
  // });

  // Alpine.store("getProducts", {
  //   url: "http://localhost:3000/products",
  //   products: [],
  //   getAllProducts() {
  //     fetch(this.url)
  //       .then((response) => response.json())
  //       .then((data) => (this.products = data));
  //   },
  // });
});

document.addEventListener("alpine:init", () => {
  Alpine.store("getProducts", {
    url: "http://localhost:3000/products",
    products: [],

    getAllProducts() {
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => (this.products = data));
    },
  });

  Alpine.store("getProducts").getAllProducts();

  const lorem = () => ({
    products: Alpine.store("getProducts").products,
  });
});

const getTodos = () => ({
  url: "http://localhost:3000/todos",
  todos: [],
  task: "",
  required: false,

  init() {
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => (this.todos = data));
  },

  saveData() {
    if (!this.task) {
      this.required = true;
      return;
    }
    fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        task: this.task,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
        this.task = "";
      });
  },

  toggleDone(id, value) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        done: value,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
      });
  },

  deleteTask(id) {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
      });
  },
});

const getSales = () => ({
  url: "http://localhost:3000/sale_items",
  sales: [],
  total: 0,
  // newProducts: Alpine.store('getProducts').products,
  produto: "",
  form: {
    product: "",
    quantity: "",
    price: "",
  },
  editTable: true,
  saveAuto: true,

  init() {
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => (this.sales = data));
  },

  getTotal(sale) {
    this.total += sale.quantity * sale.price;
  },

  async findProduct() {
    const url = `http://localhost:3000/products/${this.form.product}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => (this.produto = data));
    // Localiza e retorna o objeto product.
    // this.products.find((item) => {
    //   if (this.product == item.id) {
    //     this.price = item.price;
    //     this.quantity = Math.floor(Math.random() * 10);
    //   }
    // });
  },

  async getPrice() {
    // return price
    await this.findProduct();
    this.form.price = this.produto.price;
    this.form.quantity = Math.floor(Math.random() * 10);
  },

  focusInputProduct() {
    this.$refs.product.focus();
  },

  saveData() {
    if (!this.form.product) {
      this.required = true;
      return;
    }
    this.findProduct();
    this.form.product = this.produto;
    // Salva a venda.
    fetch(this.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: this.form.product,
        quantity: parseInt(this.form.quantity),
        price: this.form.price,
        edit: false,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
        this.form.product = "";
        this.form.quantity = "";
        this.form.price = "";
        this.edit = false;
      });
  },
});

const getProductReadOnly = (sale) => ({
  deleteSale(id) {
    fetch(`http://localhost:3000/sale_items/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
      });
  },
});

const getProductEdition = (sale) => ({
  async findProductEdition() {
    const url = `http://localhost:3000/products/${this.sale.product}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => (this.sale.product = data));
    // Localiza e retorna o objeto product.
    // this.products.find((item) => {
    //   if (this.product == item.id) {
    //     this.price = item.price;
    //     this.quantity = Math.floor(Math.random() * 10);
    //   }
    // });
  },

  // Modo Edição
  async editSale(item) {
    if (!this.saveAuto) {
      return;
    }
    if (!item.product) {
      this.required = true;
      return;
    }
    await this.findProductEdition(item);
    item.edit = false;
    delete item.subtotal;
    // Edita a venda.
    const payload = { ...item };
    fetch(`${this.url}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Todo atualizar os itens
        this.sales.find((obj) => {
          if (obj.product == data.product) {
            item.product = data.product;
          }
        });
      });
  },

  deleteSale(id) {
    fetch(`http://localhost:3000/sale_items/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
      });
  },
});

const getPersons = () => ({
  persons: [
    { id: 1, name: "Huguinho" },
    { id: 2, name: "Zezinho" },
    { id: 3, name: "Luizinho" },
  ],
});

const customer = (person) => ({
  open: false,
  updated: false,

  toggle() {
    this.open = !this.open;
  },

  changeName() {
    this.updated = !this.updated;
    person.name = "Lorem";
  },
});
