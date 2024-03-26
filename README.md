# angular-course-rest-api

## Instructions

To run the application, first install the npm packages, after that execute the next command:

```bash
npm i
npm run start:dev
```

## Endpoints

### POST /signin

**Description:** This endpoint is used for user authentication. It expects the user's credentials (e.g., username/email and password) in the request body. Upon successful authentication, it returns a JSON Web Token (JWT) that should be used to authorize subsequent requests.

**Example usage:**

```typescript
import { HttpClient } from '@angular/common/http';

const credentials = {
  email: 'jane.doe@email.com',
  password: '12345678'
};

this.http.post('http://localhost:3000/signin', credentials)
  .subscribe((response: any) => {
    const jwtToken = response.token;
    // Store the JWT token for further requests
  });

```

### POST /signup

**Description:** This endpoint is used for user registration. It expects the user's details (e.g., username, email, and password) in the request body. Upon successful registration, it returns a JWT for authentication purposes.

**Example usage:**

```typescript
import { HttpClient } from '@angular/common/http';

const newUser = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@email.com',
  password: '12345678'
};

this.http.post('http://localhost:3000/signup', newUser)
  .subscribe((response: any) => {
    const jwtToken = response.access_token;
    // Store the JWT token for further requests
  });
```

### GET /transactions

Description: This endpoint retrieves a list of transactions associated with the authenticated user. It requires a valid JWT token in the request headers for authorization.
Example usage:
typescript
Copy code
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'Authorization': 'Bearer <jwtToken>'
});

this.http.get('http://localhost:3000/transactions', { headers })
  .subscribe((response: any) => {
    // Handle the response
  });
POST /transactions

***Description:*** This endpoint is used to create a new transaction for the authenticated user. It expects transaction details (e.g., amount, description) in the request body and requires a valid JWT token in the request headers for authorization.

***Example usage:***

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';

const newTransaction = {
  type: 'Withdrawal',
  source: '7856 84 297 26',
  destination: null,
  amount: 598.74,
  category: 'Restaurant',
  description: 'Spent USD 598.74 on Restaurant'
};

const headers = new HttpHeaders({
  'Authorization': 'Bearer <jwtToken>'
});

this.http.post('http://localhost:3000/transactions', newTransaction, { headers })
  .subscribe((response: any) => {
    // Handle the response
  });
```

### GET /users/profile

***Description:*** This endpoint retrieves the profile information of the authenticated user. It requires a valid JWT token in the request headers for authorization.

***Example usage:***

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'Authorization': 'Bearer <jwtToken>'
});

this.http.get('http://localhost:3000/users/profile', { headers })
  .subscribe((response: any) => {
    // Handle the response
  });
```

## Configuration

Create a `.env` in the root folder with the next values:

```
PORT=3000
HOSTNAME=localhost
DATABASE_NAME=database
```
