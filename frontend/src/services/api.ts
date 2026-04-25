const API_BASE_URL = "http://localhost:8080/api";

export type Product = {
  id?: number;
  name: string;
  size: string;
  price: number;
  stock: number;
};

export type Sale = {
  product: Product;
  quantity: number;
  paymentMethod: string;
};

async function fetchAPI(url: string, options?: RequestInit) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  if (response.status === 204) return null;

  return response.json();
}

export function getDashboardSummary() {
  return fetchAPI(`${API_BASE_URL}/dashboard/summary`);
}

export function getSalesSummary() {
  return fetchAPI(`${API_BASE_URL}/sales/summary`);
}

export function getProducts() {
  return fetchAPI(`${API_BASE_URL}/products`);
}


export function createProduct(product: Product) {
  return fetchAPI(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}

export function updateProduct(id: number, product: Product) {
  return fetchAPI(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}

export function deleteProduct(id: number) {
  return fetchAPI(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
  });
}

export function createSale(sale: Sale) {
  return fetchAPI(`${API_BASE_URL}/sales`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sale),
  });
}

export function getLowStockCount() {
  return fetchAPI(`${API_BASE_URL}/products/low-stock`);
}

export function getSales() {
  return fetchAPI(`${API_BASE_URL}/sales`);
}

export function getLowStockProducts() {
  return fetchAPI(
    `${API_BASE_URL}/products/low-stock/list`
  );
}