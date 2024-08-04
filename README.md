
# Node.js API Project

## Overview

This project contains four main API endpoints:

1. User Login
2. User Registration
3. Add Products
4. View Quotations

### Prerequisites

- Node.js
- MongoDB
- Docker (optional)

### Getting Started

1. **Clone the repository:**
    ```sh
    git clone https://github.com/Kumarpancham551/moneefloTest.git
    cd moneefloTest
    ```
2. **Install dependencies:**
    ```sh
    npm install
    ```
3. **Create a `.env` file:**
    Create a `.env` file in the root directory and add the following:
    ```
    MONGODB_URI=mongodb://localhost:27017/moneeflo
    JWT_SECRET=your_jwt_secret
    ```
4. **Run the application:**
    ```sh
    npm run server
    ```
5. **Docker Setup (Optional):**
    ```sh
    docker build -t your_image_name .
    docker run -p 8080:8080 your_image_name
    ```
