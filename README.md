# PartnerHub 

LIVE DEMO: [PARTNER HUB](https://partner-hub.netlify.app/)

## **TECH STACK:**

    React
    JavaScript
    HTML
    CSS
    Firebase
    Single Page Application (SPA)
    Mobile-first design
    Responsive layout

## **DESCRIPTION:**

The CIS Partners App is designed to meet the needs of B2B export-oriented companies with extensive product portfolios. It aims to address the challenges posed by complex PDF catalogs and Excel price lists by providing an efficient, digital solution. This app streamlines communication between the export company, overseas distributors, and end users. 

### **Project Objectives:**

1. Simplify product accessibility, making it easier for distributors and importers to find products, prices, and promotions quickly.
2. Customize information and pricing for different users, catering to both end users and authorized partners.
3. Automate processes such as generating commercial offers, updating prices, managing promotions, handling technical requests, and optimizing order management.
4. Enhance overall efficiency by reducing manual tasks typically performed by export managers.

## **FUNCTIONS**

### **Functions for the Company (Seller):**

1. **Real-time Product and Pricelist Updates:** Instantly update product information and pricing by uploading an Excel file in JSON format to Firestore DB.
2. **Promotion and Order Management:** Manage promotions and orders effectively.

### **Functions for Unauthorized Users (End Users):**

1. **Virtual Product Catalog:** Access product information without pricing details, which may vary by location.

### **Functions for Authorized Users (Distributors/Importers):**

1. **Virtual Product Catalog:** Provide authorized users with client-specific prices, offering three dynamic options:
    a. Special item prices, if assigned to the user in the database.
    b. General discounts applied to the price list if assigned to the user in the database.
    c. Standard prices from the price list.

2. **Promotions Management:** Manage both general promotions and unique, user-specific promotions.

3. **Order Management:** Easily add items to the cart, create orders (including standard and recommended products), and send orders to the company.

## **Other relevant information:**

Orders are submited and stored in the Firebase Database and include Customer ID, submission time and the order.  
