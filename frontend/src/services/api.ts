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

export function getSalesSummary() {
  return fetchAPI(`${API_BASE_URL}/dashboard/summary`);
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

export async function exportSalesExcel() {
  const response = await fetch(
    `${API_BASE_URL}/sales/export`
  );

  if (!response.ok) {
    throw new Error(
      "No se pudo exportar el Excel"
    );
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "ventas.xlsx";

  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}

export type Expense = {
  id?: number;
  description: string;
  amount: number;
};

export function getExpenses() {
  return fetchAPI(
    `${API_BASE_URL}/expenses`
  );
}

export function createExpense(
  expense: Expense
) {
  return fetchAPI(
    `${API_BASE_URL}/expenses`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(expense),
    }
  );
}