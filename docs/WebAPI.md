Hi Rafaa,

Here is what your web app developer needs so far.

* Data model classes  
* APIs for **Sign in** and **Signup**

* **Data models:**

User  
      |\_\_\_ Vendor

![][image1]

1. The user (as a customer) signs up through the mobile app. The information is saved in the **Users** table.  
2.  If the user wishes to become a vendor, they are redirected to the website via a link.  
* On the website’s registration form, both the **User** and **Vendor** records are initialized and linked through a one-to-one relationship (**User.Id** ↔ **Vendor.UserId**).

Please consider that in the website’s registration form, both the User and Vendor tables need to be initialized with the same user ID.  
**User:**

**\[**  
  **{**  
    **"id": 0,**  
    **"fullName": "string",**  
    **"email": "string",**  
    **"phone": "string",**  
    **"passwordHash": "string",**  
    **"address": "string",**  
    **"role": "string",**  
    **"createdAt": "2025-10-19T20:34:14.118Z"**  
  **}**  
**\]**

Example:

  **{**  
    **"id": 1,**  
    **"fullName": "Maziar H",**  
    **"email": "maz@email.com",**  
    **"phone": "647 629 1809",**  
    **"passwordHash": "boDwP+zs7hEiQSAazSVlmA==:Vi0f0Fe0f/OJkELRlklBBeZ6mtDd7xZIWjs9RI72wqI=",**  
    **"address": "",**  
    **"role": "Vendor",**  
    **"createdAt": "2025-10-11T02:23:57.487552"**  
  **},**

**Vendor:**

**\[**  
  **{**  
    **"id": 0,**  
    **"userId": 0,**  
    **"businessName": "string",**  
    **"contactName": "string",**  
    **"businessPhone": "string",**  
    **"businessEmail": "string",**  
    **"businessAddress": "string",**  
    **"serviceArea": "string",**  
    **"serviceType": "string",**  
    **"description": "string",**  
    **"website": "string",**  
    **"instagram": "string",**  
    **"facebook": "string",**  
    **"linkedin": "string",**  
    **"ratingAverage": 0,**  
    **"reviewCount": 0,**  
    **"listings": “”**  
  **}**  
**\]**

example:

  **{**  
    **"id": 1,**  
    **"userId": 1,**  
    **"businessName": "MyCatering Inc.",**  
    **"contactName": "maziar",**  
    **"businessPhone": "905 123 4567",**  
    **"businessEmail": "mycat@email.com",**  
    **"businessAddress": "10 Tangreen Ct. North York, ON",**  
    **"serviceArea": "Toronto",**  
    **"serviceType": "Catering, Staffing, Rentals",**  
    **"description": "We have more than 20 years of experience in cooking, catering, staffing, and renting hospitality equipment across Ontario.",**  
    **"website": "website URL",**  
    **"instagram": "Instagram Address",**  
    **"facebook": "Facebook Address",**  
    **"linkedin": "Linkedin Address",**  
    **"ratingAverage": 0,**  
    **"reviewCount": 0,**  
    **"listings": null**  
  **}**

* **APIs:            (temporary URL—allset.aitnt.ca will be replaced with your URL)**

* **Login**

Request body:  
{  
  "email": "maz@email.com",  
  "password": "123456"  
}

Request URL

*   
* **https://allset.aitnt.ca/api/Users/login**  
* 

Response body

**{**  
  **"message": "Login successful",**  
  **"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwidW5pcXVlX25hbWUiOiJNYXppYXIgSCIsImVtYWlsIjoibWF6QGVtYWlsLmNvbSIsInJvbGUiOiJWZW5kb3IiLCJuYmYiOjE3NjA5MDY2ODUsImV4cCI6MTc2MDkxMzg4NSwiaWF0IjoxNzYwOTA2Njg1LCJpc3MiOiJodHRwczovL2xvY2FsaG9zdDo3MDIyLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcwMjIvIn0.E7Nb1gkUKxB-hPZ4AdKQ0y7YK1FcPJlCryTFG9mlQ9I",**  
  **"user": {**  
    **"id": 1,**  
    **"fullName": "Maziar H",**  
    **"email": "maz@email.com",**  
    **"phone": "647 629 1809",**  
    **"address": "10 Tangreen Ct. North York, ON",**  
    **"role": "Vendor",**  
    **"createdAt": "2025-10-11T02:23:57.487552"**  
  **}**  
**}**

* **Register (Customer)**

Request body:  
{  
  "fullName": "John Smaith",  
  "email": "john@email.com",  
  "phone": "416 123 4567",  
  "password": "123456",  
  "address": "",  
  "role": "Customer"  
}

Request URL

*   
* **https://allset.aitnt.ca/api/Users/register**  
* 

Response body

**{**  
  **"message": "User registered successfully"**  
**}**

* **Register (Vendor)**

Request body  
{  
  "userId": 2,  
  "businessName": "Second Company Inc.",  
  "contactName": "John Doe",  
  "businessPhone": "905 456 1237",  
  "businessEmail": "sc@email.com",  
  "businessAddress": "100 Yonge St. Unit 12, Toronto, ON",  
  "serviceArea": "GTA",  
  "serviceType": "Catering, Staffing, DJ",  
  "description": "With over 20 years of experience in hospitality ...",  
  "website": "http://secondcorp.ca",  
  "instagram": "insta",  
  "facebook": "http://facebook.com/secondcorp",  
  "linkedin": "http://linkedin.com/second",  
  "ratingAverage": 0,  
  "reviewCount": 0  
}

**Request URL**

**https://allset.aitnt.ca/api/Vendors/byUser/2**

**Response body**

**{**  
  **"id": 3,**  
  **"userId": 2,**  
  **"businessName": "Second Company Inc.",**  
  **"contactName": "John Doe",**  
  **"businessPhone": "905 456 1237",**  
  **"businessEmail": "sc@email.com",**  
  **"businessAddress": "100 Yonge St. Unit 12, Toronto, ON",**  
  **"serviceArea": "GTA",**  
  **"serviceType": "Catering, Staffing, DJ",**  
  **"description": "With over 20 years of experience in hospitality ...",**  
  **"website": "http://secondcorp.ca",**  
  **"instagram": "insta",**  
  **"facebook": "http://facebook.com/secondcorp",**  
  **"linkedin": "http://linkedin.com/second",**  
  **"ratingAverage": 0,**  
  **"reviewCount": 0,**  
  **"listings": null**  
**}**

Get APIs:

GET User by Id:

**https://localhost:7078/api/Users/1**

GET Vendor by UserId

**https://localhost:7078/api/Vendors/byUser/1**

I will provide more …

[image1]: <data:image/png;base64,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>