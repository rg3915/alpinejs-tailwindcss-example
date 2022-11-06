document.addEventListener("alpine:init", () => {
  Alpine.store("getCategories", {
    categories: [],
    url: "http://localhost:3000/categories",
    init() {
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => (this.categories = data));
    },
  });

  Alpine.data("getProducts", () => ({
    products: [],
    url: "http://localhost:3000/products",
    init() {
      fetch(this.url)
        .then((response) => response.json())
        .then((data) => (this.products = data));
    },
    teste() {
      console.log("this.$store.getCategories.categories");
      console.table(this.$store.getCategories.categories);
    },
  }));
});
