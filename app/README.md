## Database Schema Design

![schema](group-etsy-schema.png)


## Backend Routes

### Products

1.
--- create a new product
* route/url- "/products"
* method- POST
* status code- 201

2.
---get all products
* route/url- "/products"
* method- GET
* status code- 200

3.
---get a product by ID
* route/url- "/products/:productId"
* method- GET
* status code- 200

4.
--- Edit a product by ID
* route/url- ""/products/:productId/edit"
* method- PUT
* status code- 200

5.
delete a product by ID
* route/url- "/products/:productId"
* method- DELETE
* status code- 200

 ## Reviews
