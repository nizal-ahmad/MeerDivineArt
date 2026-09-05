# Meer Divine Art — REST API Documentation

Base URL: `http://localhost:5000/api` (or environment `VITE_API_URL`)

---

## 1. Authentication Endpoints (`/api/auth`)

### Admin Login
- **POST** `/api/auth/login`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "email": "admin@meerdivineart.com",
    "password": "AdminPassword123!"
  }
  ```
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "message": "Admin login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "admin": {
        "id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "email": "admin@meerdivineart.com"
      }
    }
  }
  ```

### Verify Admin Profile
- **GET** `/api/auth/me`
- **Access**: Protected (`Bearer <JWT_TOKEN>`)
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "id": "64f1a2b3c4d5e6f7a8b9c0d1",
      "email": "admin@meerdivineart.com"
    }
  }
  ```

---

## 2. Product Endpoints (`/api/products`)

### Get Product Catalog (Filtered & Paginated)
- **GET** `/api/products`
- **Access**: Public
- **Query Parameters**:
  - `page`: Page number (default: `1`)
  - `limit`: Items per page (default: `20`)
  - `search`: Search name, description, SKU
  - `category`: Category slug or ObjectId
  - `minPrice` / `maxPrice`: Filter price range
  - `sort`: `featured`, `price-asc`, `price-desc`, `name`, `rating`
  - `active`: Filter by status (`true`/`false`)
- **Response** (`200 OK`):
  ```json
  {
    "success": true,
    "data": {
      "products": [...],
      "pagination": {
        "total": 12,
        "page": 1,
        "limit": 20,
        "pages": 1
      }
    }
  }
  ```

### Get Single Product
- **GET** `/api/products/:id` or `/api/products/slug/:slug`
- **Access**: Public

### Create Product
- **POST** `/api/products`
- **Access**: Protected (`Bearer <JWT_TOKEN>`)
- **Content-Type**: `multipart/form-data`
- **Fields**: `name`, `description`, `price`, `discountPrice`, `category`, `stock`, `sku`, `sizes`, `colors`, `images` (multiple file fields).

### Update Product
- **PUT** `/api/products/:id`
- **Access**: Protected (`Bearer <JWT_TOKEN>`)

### Delete Product
- **DELETE** `/api/products/:id`
- **Access**: Protected (`Bearer <JWT_TOKEN>`)

---

## 3. Category Endpoints (`/api/categories`)

### Get All Categories
- **GET** `/api/categories`
- **Access**: Public

### Create Category
- **POST** `/api/categories`
- **Access**: Protected (`Bearer <JWT_TOKEN>`)
- **Fields**: `name`, `tagline`, `description`, `image` (file).

---

## 4. Order Endpoints (`/api/orders`)

### Customer Order Checkout
- **POST** `/api/orders`
- **Access**: Public
- **Request Body**:
  ```json
  {
    "customer": {
      "name": "Ayesha Khan",
      "email": "ayesha@example.com",
      "phone": "03001234567",
      "address": "Street 4, Sector F-7",
      "city": "Islamabad"
    },
    "items": [
      {
        "productId": "allah-muhammad-frame",
        "quantity": 1,
        "size": "16\" x 16\"",
        "frameColor": "Antique Gold"
      }
    ],
    "paymentMethod": "Cash on Delivery"
  }
  ```

### Get Orders List (Admin)
- **GET** `/api/orders`
- **Access**: Protected (`Bearer <JWT_TOKEN>`)

### Update Order / Payment Status
- **PATCH** `/api/orders/:id/status`
- **Access**: Protected (`Bearer <JWT_TOKEN>`)
- **Body**:
  ```json
  {
    "orderStatus": "shipped",
    "paymentStatus": "paid"
  }
  ```

---

## 5. Admin Dashboard & Analytics (`/api/admin`)

### Overview Metrics
- **GET** `/api/admin/dashboard`
- **Access**: Protected (`Bearer <JWT_TOKEN>`)

### Recharts Analytics
- **GET** `/api/admin/analytics?range=30days`
- **Access**: Protected (`Bearer <JWT_TOKEN>`)
