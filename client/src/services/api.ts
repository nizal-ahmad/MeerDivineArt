import { toast } from "sonner";

const API_BASE_URL =
  (import.meta.env["VITE_API_URL"] as string | undefined) || "meerdivineart-production.up.railway.app/api";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("mda_admin_token");
}

export function setAdminToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) {
    localStorage.setItem("mda_admin_token", token);
  } else {
    localStorage.removeItem("mda_admin_token");
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  // If body is not FormData, add Content-Type: application/json
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json();

    if (!res.ok) {
      const errorMsg = data.message || "An unexpected error occurred";
      if (res.status === 401 && token) {
        setAdminToken(null);
        if (window.location.pathname.startsWith("/admin") && !window.location.pathname.includes("/admin/login")) {
          window.location.href = "/admin/login";
        }
      }
      throw new Error(errorMsg);
    }

    return data;
  } catch (err: any) {
    throw err;
  }
}

export const api = {
  // Auth
  login: async (credentials: { email: string; password: string }) => {
    const res = await request<{
      success: boolean;
      data: { token: string; admin: { id: string; email: string } };
    }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (res.success && res.data.token) {
      setAdminToken(res.data.token);
    }
    return res;
  },

  getProfile: async () => {
    return request<{ success: boolean; data: { id: string; email: string } }>(
      "/auth/me"
    );
  },

  logout: () => {
    setAdminToken(null);
    toast.success("Logged out successfully");
  },

  // Products
  getProducts: async (params?: Record<string, string | number | boolean>) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          query.append(key, String(val));
        }
      });
    }
    const qStr = query.toString() ? `?${query.toString()}` : "";
    return request<{
      success: boolean;
      data: {
        products: any[];
        pagination: { total: number; page: number; limit: number; pages: number };
      };
    }>(`/products${qStr}`);
  },

  getProduct: async (idOrSlug: string) => {
    return request<{ success: boolean; data: any }>(`/products/${idOrSlug}`);
  },

  getProductBySlug: async (slug: string) => {
    return request<{ success: boolean; data: any }>(`/products/slug/${slug}`);
  },

  createProduct: async (formData: FormData) => {
    return request<{ success: boolean; message: string; data: any }>(
      "/products",
      {
        method: "POST",
        body: formData,
      }
    );
  },

  updateProduct: async (id: string, formData: FormData) => {
    return request<{ success: boolean; message: string; data: any }>(
      `/products/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
  },

  deleteProduct: async (id: string) => {
    return request<{ success: boolean; message: string }>(`/products/${id}`, {
      method: "DELETE",
    });
  },

  toggleProductStatus: async (id: string) => {
    return request<{ success: boolean; message: string; data: any }>(
      `/products/${id}/status`,
      { method: "PATCH" }
    );
  },

  updateStock: async (id: string, stock: number) => {
    return request<{ success: boolean; message: string; data: any }>(
      `/products/${id}/stock`,
      {
        method: "PATCH",
        body: JSON.stringify({ stock }),
      }
    );
  },

  // Categories
  getCategories: async (includeInactive = false) => {
    const query = includeInactive ? "?includeInactive=true" : "";
    return request<{ success: boolean; data: any[] }>(`/categories${query}`);
  },

  getCategory: async (idOrSlug: string) => {
    return request<{ success: boolean; data: any }>(`/categories/${idOrSlug}`);
  },

  createCategory: async (formData: FormData) => {
    return request<{ success: boolean; message: string; data: any }>(
      "/categories",
      {
        method: "POST",
        body: formData,
      }
    );
  },

  updateCategory: async (id: string, formData: FormData) => {
    return request<{ success: boolean; message: string; data: any }>(
      `/categories/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );
  },

  deleteCategory: async (id: string) => {
    return request<{ success: boolean; message: string }>(
      `/categories/${id}`,
      { method: "DELETE" }
    );
  },

  toggleCategoryStatus: async (id: string) => {
    return request<{ success: boolean; message: string; data: any }>(
      `/categories/${id}/status`,
      { method: "PATCH" }
    );
  },

  // Orders
  createOrder: async (orderPayload: any) => {
    return request<{ success: boolean; message: string; data: any }>(
      "/orders",
      {
        method: "POST",
        body: JSON.stringify(orderPayload),
      }
    );
  },

  getOrders: async (params?: Record<string, string | number>) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          query.append(key, String(val));
        }
      });
    }
    const qStr = query.toString() ? `?${query.toString()}` : "";
    return request<{
      success: boolean;
      data: {
        orders: any[];
        pagination: { total: number; page: number; limit: number; pages: number };
      };
    }>(`/orders${qStr}`);
  },

  getOrder: async (id: string) => {
    return request<{ success: boolean; data: any }>(`/orders/${id}`);
  },

  updateOrderStatus: async (
    id: string,
    statusPayload: { orderStatus?: string; paymentStatus?: string }
  ) => {
    return request<{ success: boolean; message: string; data: any }>(
      `/orders/${id}/status`,
      {
        method: "PATCH",
        body: JSON.stringify(statusPayload),
      }
    );
  },

  // Admin Dashboard & Analytics
  getDashboardOverview: async () => {
    return request<{
      success: boolean;
      data: {
        metrics: {
          totalRevenue: number;
          totalOrders: number;
          totalProducts: number;
          uniqueCustomers: number;
          pendingOrders: number;
          completedOrders: number;
        };
        recentOrders: any[];
      };
    }>("/admin/dashboard");
  },

  getAnalytics: async (range = "30days") => {
    return request<{
      success: boolean;
      data: {
        salesChart: { date: string; revenue: number; orders: number }[];
        bestSellingProducts: { _id: string; quantitySold: number; totalRevenue: number }[];
        categoryPerformance: { name: string; productsCount: number }[];
      };
    }>(`/admin/analytics?range=${range}`);
  },
};
