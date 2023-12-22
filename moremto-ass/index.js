async function init() {
    const productListDiv = document.getElementById('productList');
    const data = await fetchData();
  
    if (Array.isArray(data)) {
      data.forEach(product => {
        const productElement = createProductElement(product);
        productListDiv.appendChild(productElement);
      });
    } else {
      console.error('Invalid data format:', data);
    }
  }
  
  window.onload = init;
  
  const gridViewBtn = document.getElementById('gridViewBtn');
  gridViewBtn.addEventListener('click', function () {
    const productListDiv = document.getElementById('productList');
    productListDiv.classList.remove('list-view');
    productListDiv.classList.add('grid-view');
  });
  
  const listViewBtn = document.getElementById('listViewBtn');
  listViewBtn.addEventListener('click', function () {
    const productListDiv = document.getElementById('productList');
    productListDiv.classList.remove('grid-view');
    productListDiv.classList.add('list-view');
  });
  
  async function fetchData() {
    try {
      const response = await fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093', {
        method: 'GET',
      });
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
  
  function createProductElement(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
  
    const image = document.createElement('img');
    image.src = getProductImage(product.product_title);
    image.alt = product.product_title;
    productDiv.appendChild(image);
  
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
  
    const title = document.createElement('h3');
    title.textContent = product.product_title;
    contentDiv.classList.add('product-title')
    contentDiv.appendChild(title);
  
    const badge = document.createElement('p');
    badge.textContent = product.product_badge;
    contentDiv.classList.add('para')
    contentDiv.appendChild(badge);
  
    const variants = document.createElement('div');
    variants.classList.add('variants');
  
    product.product_variants.forEach(variant => {
      const variantPara = document.createElement('p');
      variantPara.textContent = Object.values(variant)[0];
      variants.appendChild(variantPara);
    });
  
    contentDiv.appendChild(variants);
  
    productDiv.appendChild(contentDiv);
  
    const searchInput = document.getElementById('searchInput');
  
    function highlightTextOnClick(event) {
      const clickedText = event.target.textContent.toLowerCase();
      if (searchInput.value.toLowerCase() === clickedText) {
        event.target.classList.toggle('highlight');
      }
    }
  
    variants.childNodes.forEach(node => {
      node.addEventListener('click', highlightTextOnClick);
    });
  
    searchInput.addEventListener('input', () => {
      variants.childNodes.forEach(node => {
        const nodeText = node.textContent.toLowerCase();
        const searchValue = searchInput.value.toLowerCase();
        if (nodeText.includes(searchValue) && searchValue !== '') {
          node.classList.add('highlight');
        } else {
          node.classList.remove('highlight');
        }
      });
    });
  
    searchInput.addEventListener('blur', () => {
      variants.childNodes.forEach(node => {
        node.classList.remove('highlight');
      });
    });
  
    return productDiv;
  }
  
  function getProductImage(title) {
    switch (title) {
      case 'Limited':
        return './Images/cap1.jpg';
      case 'Um Training':
        return './Images/cap2.png';
      case 'Beach Bum':
        return './Images/cap3.png';
      case 'Limited X':
        return './Images/cap1.jpg';
      case 'Um Training X':
        return './Images/cap2.png';
      case 'Beach Bum X':
        return './Images/cap3.png';
      default:
        return './Images/default.jpg';
    }
  }
  
  function getProductVariants(variants) {
    return variants.map(variant => Object.values(variant)[0]).join(', ');
  }
  
  async function displayProducts(view) {
    const productListDiv = document.getElementById('productList');
    productListDiv.classList.add(view);
  
    const data = await fetchData();
  
    if (Array.isArray(data)) {
      data.forEach(product => {
        const productElement = createProductElement(product);
        productListDiv.appendChild(productElement);
      });
    } else {
      console.error('Invalid data format:', data);
    }
  }
  
  document.getElementById('listViewBtn').addEventListener('click', () => {
    document.getElementById('productList').classList.remove('grid');
    displayProducts('list');
  });
  
  document.getElementById('gridViewBtn').addEventListener('click', () => {
    document.getElementById('productList').classList.add('grid');
    displayProducts('grid');
  });
  
  window.onload = displayProducts('list');
  