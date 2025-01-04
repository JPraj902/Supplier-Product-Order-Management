# Supplier-Product-Order-Management

A React-based application designed to streamline the management of suppliers, products, and orders. This project provides an intuitive interface for managing supplier and product details, processing orders, and viewing summaries of all data.

---

## 📋 Features

- **Supplier Management**: Add, edit, and delete supplier details.
- **Product Management**: Manage product details, including adding, updating, and deleting products.
- **Order Processing**: Place new orders and track existing ones seamlessly.
- **Data Summary**: View summaries of suppliers, products, and orders in an organized manner.
- **User-Friendly Interface**: Designed using styled-components for a modern and responsive UI.

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your system.

### Prerequisites

- Ensure you have **Node.js** and **npm** installed. You can download Node.js from [here](https://nodejs.org/).

---

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/JPraj902/Supplier-Product-Order-Management.git

2. **Navigate to the Project Directory**:
   ```bash
   cd Supplier-Product-Order-Management/supplier-product-order

3. **Install Dependencies: Install all necessary packages using npm**:
   ```bash
   npm install

4. **Run the Application: Start the development server**:
   ```bash
   npm run dev
The app will be available at `http://localhost:3000`

## 🗄️ Database Setup

Follow these steps to set up the project locally on your system.
1. **Locate the SQL File**:
   - The SQLite database file is usually named `database.sqlite` (or similar) and should already be included in the project.
2. **Database Schema**:
   - If you need to initialize a fresh database, use the provided schema.sql file to create the necessary tables:
```
   CREATE TABLE suppliers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact_info TEXT
);
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    supplier_id INTEGER,
    FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
);
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    quantity INTEGER,
    order_date TEXT,
    FOREIGN KEY (product_id) REFERENCES products (id)
);
```
- You can execute this script using any SQLite management tool or programmatically within the application.
3. **Connect to SQLite**:
- Ensure your application is configured to use the correct path to the SQLite database file (e.g., `database.sqlite` in the root directory).

## 🛠️ How to Use
- **Add Suppliers**: Navigate to the 'Suppliers' section and click "Add Supplier" to add a new supplier.
- **Manage Products**: Go to the 'Products' section to add, update, or delete product details.
- **Place Orders**: Access the 'Orders' section to create new orders and track existing ones.
- **View Data Summaries**: Use the 'Summary' section to view aggregated details for suppliers, products, and orders.

## 🤝 Contributing
Contributions are welcome! Here's how you can contribute to this project:
1. **Fork the Repository**: Click the "Fork" button at the top of this repository.
2. **Clone Your Fork**:
```
git clone https://github.com/JPraj902/Supplier-Product-Order-Management

```
3. **Create a Branch**:
```
git checkout -b feature-name

```
4. **Make Changes**: Add your feature or fix bugs.
5. **Commit Your Changes**:
```
git commit -m "Add your message here"

```
6. **Push to Your Branch**:
```
git push origin feature-name

```
7. **Submit a Pull Request**: Open a pull request on the original repository.

## 📞 Contact
If you have any questions, suggestions, or issues, feel free to open an issue in this repository or contact the project maintainer via GitHub.

## 🌟 Acknowledgments
Thank you for using this application. Don’t forget to star ⭐ the repository if you find it useful!
```
---

This version specifies **SQLite** as the database and includes instructions for setting up the schema using an `SQL` script.😊
```
