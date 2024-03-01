function sortProducts(products, sort_key, ascending) {
    return products.sort((a, b) => {
        let comparison = 0;


        if (a[sort_key] > b[sort_key]) {
            comparison = 1;
        } else if (a[sort_key] < b[sort_key]) {
            comparison = -1;
        }


        return ascending ? comparison : comparison * -1;
    });
}


let products = [
    {"name": "Product A", "price": 100, "stock": 5},
    {"name": "Product B", "price": 200, "stock": 3},
    {"name": "Product C", "price": 50, "stock": 10}
];
let sort_key = "stock";
let ascending = true;


let sortedProducts = sortProducts(products, sort_key, ascending);


console.log(sortedProducts);
