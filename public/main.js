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

const getProducts = () => ({
  url: "http://localhost:3000/products",
  url_sale_items: "http://localhost:3000/sale_items",
  products: [],
  sales: [],
  product: "",
  quantity: "",
  price: "",
  total: 0,
  editTable: true,
  init() {
    fetch(this.url)
      .then((response) => response.json())
      .then((data) => (this.products = data));
    fetch(this.url_sale_items)
      .then((response) => response.json())
      .then((data) => (this.sales = data));
  },
  getProduct() {
    // return price
    this.products.find((item) => {
      if (this.product == item.id) {
        this.price = item.price;
      }
    });
  },
  getTotal(sale) {
    this.total += sale.quantity * sale.price;
  },
  saveData() {
    if (!this.product) {
      this.required = true;
      return;
    }
    // Localiza e retorna o objeto product.
    this.products.find((item) => {
      if (this.product == item.id) {
        this.product = item;
      }
    });
    // Salva a venda.
    fetch(this.url_sale_items, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: this.product,
        quantity: this.quantity,
        price: this.price,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        this.init();
        this.product = "";
        this.quantity = "";
        this.price = "";
      });
  },
  editSale(item) {
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
