document.addEventListener("alpine:init", () => {
  Alpine.store("getCategories", {
    categories: [
      {
        id: 1,
        title: "notebook",
      },
      {
        id: 2,
        title: "pc",
      },
    ],
  });

  Alpine.data("getNewCategories", () => ({
    newCategories: [],
    init() {
      this.newCategories = this.$store.getCategories.categories;
    },
  }));
});
