
# Auth System by React and GO

Rest API using Go  language and postgres for persist data
and handel this in the client side by react and RTK Query


## API Reference

#### Get all items

```http
  GET /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `List` | **Required**. Your API key |

#### Login 

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|           | `object` | **Required**. Json User object |


#### Register 

```http
  POST /auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|           | `object` | **Required**. Json User object |




## Run Locally

Clone the project

```bash
  git clone https://github.com/eslamward/authsystem
```

Go to the project directory

```bash
  cd authsystem
```

```bash
  go run . <database username> <database password>
```

To run the clientside

```bash
  cd cleintside/authsystem
```

Install dependences
```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Go, Gin, Postgres


## Authors

- [@Islamward](https://www.github.com/eslamward)

