const catalogList = document.querySelector(".catalog__list");
const loadMore = document.querySelector(".show-more");
let qty = 5;
let dataLenght = null;

if (catalogList) {
  const loadProducts = (qty = 5) => {
    fetch('../data/data.json')
    .then(resp=>resp.json())
    .then(data=>{
      catalogList.innerHTML = ''
      let items = [];
      dataLenght = data.length
      for(let i=0; i<dataLenght;i++){
        if (i<qty) {
          let item = data[i]
          items.push(getCatalogItemhtml(item))
        }
      }
      catalogList.innerHTML = items.join('');
    })
  }
  loadProducts()
  loadMore.addEventListener('click',e=>{
    qty+=3
    loadProducts(qty)
    if (qty >= dataLenght) {
      loadMore.style.display = "none";
    }
  })
}
document.addEventListener('click',e=>{
  if (
    e.target.classList.contains("show-product") ||
    e.target.classList.contains("to-cart")
  ) {
    const id = e.target.dataset.id;
    const action = e.target.dataset.action;
  }
})

function getCatalogItemhtml(item) {
  return `<article class="product">
  <div class="product__img _ibg">
    <img src="${item.mainImage}" alt="${item.title}" />
    <div class="product__actions">
      <button class="action-link show-product icon icon-eye" data-toggle="modal" data-id="${item.id}"></button>
      <button class="action-link to-cart icon icon-cart" data-toggle="modal" data-id="${item.id}"></button>
    </div>
  </div>
  <h3 class="product__title" title="${item.title}">${item.title}</h3>
  <div class="price product__price">${item.price} &#8372;</div>
</article>`;
}