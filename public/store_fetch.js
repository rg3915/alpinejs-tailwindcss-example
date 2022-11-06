document.addEventListener("alpine:init", () => {
  Alpine.store("getCategories", {
    categories: [],
    url: "http://localhost:3000/categories",
    init(){
        console.log(1)
        fetch(this.url)
        .then((response) => response.json())
        .then((data) => (this.categories = data));
    }
  });

  Alpine.data("getNewCategories", () => ({
    newCategories: [],
    init() {
      console.log(2)
      this.newCategories = this.$store.getCategories.categories;
      console.log('this.newCategories', this.newCategories)
    },
  }));
});
