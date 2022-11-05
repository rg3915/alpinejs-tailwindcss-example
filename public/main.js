document.addEventListener("alpine:init", () => {
  Alpine.store("getCategories", {
    url: "http://localhost:3000/categories",
    categories: [],
    getAllCategories() {
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => (this.categories = data));
    },
  });

  Alpine.store("getProducts", {
    url: "http://localhost:3000/products",
    products: [],
    getAllProducts() {
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => (this.products = data));
    },
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
  product: "",
  quantity: "",
  price: "",
  editTable: false,
  saveAuto: true,
  init() {
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => (this.sales = data));

    // this.sales.map((item) => {
    // })
  },
  getTotal(sale) {
    this.total += sale.quantity * sale.price;
  },
  getPrice() {
    // return price
    this.products.find((item) => {
      if (this.product == item.id) {
        this.price = item.price;
        this.quantity = Math.floor(Math.random() * 10);
      }
    });
  },
  saveData() {
    if (!this.product) {
      this.required = true;
      return;
    }
    // // Localiza e retorna o objeto product.
    // this.products.find((item) => {
    //   if (this.product == item.id) {
    //     this.product = item;
    //   }
    // });
    // Salva a venda.
    fetch(this.url_sale_items, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: parseInt(this.product),
        quantity: parseInt(this.quantity),
        price: this.price,
        edit: false,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
        this.product = "";
        this.quantity = "";
        this.price = "";
        this.edit = false;
      });
  },
});

const getProductReadOnly = (sale) => ({
  deleteSale(id) {
    console.log(1);
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
  // Modo Edição
  editSale(item) {
    if (!this.saveAuto) {
      return;
    }
    if (!item.product) {
      this.required = true;
      return;
    }
    // Localiza e retorna o objeto product.
    this.products.find((obj) => {
      if (item.product == obj.id) {
        item.product = obj;
      }
    });
    item.edit = false;
    delete item.subtotal;
    // Edita a venda.
    const payload = { ...item };
    fetch(`${this.url_sale_items}/${item.id}`, {
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
    console.table(item);
  },
  deleteSale(id) {
    console.log(2);
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
