const { version } = require('../../package.json');

const swaggerDef = {
  "swagger": "2.0",
  "info": {
    version,
    "title": "KudiFlow",
    "description": "<img src=\"https://content.pstmn.io/61406565-3b97-4ea5-b4f6-b245e5d3d7fb/RnJhbWUgNC5qcGc=\" alt=\"\" height=\"143\" width=\"100\">\n\n# KudiFlow API\n\nApi Documentation to make others understand the appropriate requests and responses need to consume the available endpoints\n\n## Overview\n\n_There are two subdivisons of the kudiflow api which are:_\n\n- User Auth - Which deals with the entire authentication, and creation of a user in KudiFlow\n- Track Income and Exp - Which deals with the entire backend logic of the track feature implemented in the **KudiFlow Application**",
    "contact": {
      name: 'KudiFlow',
      email: process.env.MAIL_USER,
    }
  },
  "host": "http://localhost:5000/v1",
  "basePath": "/",
  "securityDefinitions": {},
  "schemes": [
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/account/register": {
      "post": {
        "description": "## Register Request\n\nThis request creates a **user** account, a returns a success message upon completion.\n\nIt takes in three required parameters which are:\n\n- username\n- email\n- password\n    \n\nThe email inputted should be unique unless an error would be gotten",
        "summary": "Register User",
        "tags": [
          "User Auth"
        ],
        "operationId": "RegisterUser",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "consumes": [
          "application/x-www-form-urlencoded"
        ],
        "parameters": [
          {
            "name": "email",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "password",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          },
          {
            "name": "username",
            "in": "formData",
            "required": true,
            "type": "string",
            "description": ""
          }
        ],
        "responses": {
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/Userexists1"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "error": "User already exists"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "31"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"1f-lFUySNKwX3L5eGEwGcNcUoVKWhE\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:10:33 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          },
          "201": {
            "description": "Created",
            "schema": {
              "$ref": "#/definitions/RegistrationSuccess"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "message": "success"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "21"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"15-ga8EF/lp+ThIsc8w/OHbk4hPrME\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:12:14 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          }
        },
        "security": []
      }
    },
    "/account/logout": {
      "get": {
        "description": "## Logout Request\n\nThis endpoint logs out the user currently in session and gives an empty response else returns an error message that the user is not authorized",
        "summary": "Logout User",
        "tags": [
          "User Auth"
        ],
        "operationId": "LogoutUser",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "parameters": [],
        "responses": {
          "204": {
            "description": "No Content",
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:24:28 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/Invalidorexpiredtoken1"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "error": "Unauthorized"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "24"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"18-XPDV80vbMk4yY1/PADG4jYM4rSI\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:25:08 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          }
        },
        "security": []
      }
    },
    "/account/token-reset": {
      "get": {
        "description": "## Token Request\n\nThis endpoint takes in the access **token** given on sign in\n\nExpired or not and generates a new one, the accesstoken passed in must be a valid token recognised by the server\n\nIf not availale it returns an error of **Forbidden**",
        "summary": "New token",
        "tags": [
          "User Auth"
        ],
        "operationId": "Newtoken",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "parameters": [],
        "responses": {
          "403": {
            "description": "Forbidden",
            "schema": {
              "$ref": "#/definitions/Invalidtokenpassed1"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "error": "Forbidden"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "21"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"15-TLNzmZqKxaTuFdX/dVWWPBu44/c\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:22:27 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          },
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Validtokenpassed"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZhMzJmMzExM2NlOWRkNzM0Y2JkMyIsImlhdCI6MTY3OTI0Mjk5NiwiZXhwIjoxNjc5MjQzODk2fQ._fyodqiVAtvOL8gqYlY1-oEzE35HKBmYdOzw-XmdQHk"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "189"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"bd-ue+McF4pdOAOr6R1LZbpPyLAGss\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:23:17 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          }
        },
        "security": []
      }
    },
    "/forgot": {
      "get": {
        "description": "## Forgot Password request\n\nThis request sends a mail to the user. Where the user is redirected to page to reset his/her `password`\n\nOnce the mail is sent successfully, a `success` message is gotten.\n\nIf the user can't be found an error message message is sent saying `NOT FOUND`",
        "summary": "Forgot password",
        "tags": [
          "User Auth"
        ],
        "operationId": "Forgotpassword",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "parameters": [],
        "responses": {
          "202": {
            "description": "Accepted",
            "schema": {
              "$ref": "#/definitions/ForgotPassword"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "message": "success"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "21"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"15-ga8EF/lp+ThIsc8w/OHbk4hPrME\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:21:33 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          }
        },
        "security": []
      }
    },
    "/account/login": {
      "get": {
        "description": "## Login Request\n\nThis endpoint takes in a registered user's **email** and **password, then returns an accesstoken that the user can use to access other pages in the website**",
        "summary": "Login user",
        "tags": [
          "User Auth"
        ],
        "operationId": "Loginuser",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "parameters": [],
        "responses": {
          "202": {
            "description": "Accepted",
            "schema": {
              "$ref": "#/definitions/Userloggedin"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZhMzJmMzExM2NlOWRkNzM0Y2JkMyIsImlhdCI6MTY3OTI0MjM5NiwiZXhwIjoxNjc5MjQzMjk2fQ.neIJoXt3KDIqqUoyiyFXsD2Qml8IuXW_LG_nmbP_5cE"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "189"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"bd-lzjzX7O61sAW/chEa0az6vsQX1U\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:13:16 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/Invalidpasswordoremail1"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "error": "Invalid email or password"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "37"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"25-3YG4LRpklFolV4uVOnUIRm2hZA0\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:16:14 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          }
        },
        "security": []
      }
    },
    "/account/password-reset": {
      "post": {
        "description": "## Password Reset request\n\nThis request is used to reset the `user` password. It takes in `newPassword`, confirmPassword and the `reset_token which are all string fields`",
        "summary": "Reset password",
        "tags": [
          "User Auth"
        ],
        "operationId": "Resetpassword",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "parameters": [
          {
            "name": "Body",
            "in": "body",
            "required": true,
            "description": "",
            "schema": {
              "$ref": "#/definitions/ResetpasswordRequest"
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/Invalidrefreshtoken1"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "error": "Unauthorized"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "24"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"18-XPDV80vbMk4yY1/PADG4jYM4rSI\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:39:41 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          }
        },
        "security": []
      }
    },
    "/track/trackIEs": {
      "get": {
        "description": "## Income-Expense Request\n\nThis request gets the list of `income` and `expense` for the current user requesting as well as the updated current balance.\n\nThe income and expenses are paginated, a param `page` and/or `limit` can be set to get a particular page with a limit to documents recieved",
        "summary": "User income and expense",
        "tags": [
          "Track Income and Exp"
        ],
        "operationId": "Userincomeandexpense",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "parameters": [
          {
            "name": "page",
            "in": "query",
            "required": true,
            "type": "integer",
            "format": "int32",
            "description": ""
          },
          {
            "name": "limit",
            "in": "query",
            "required": true,
            "type": "integer",
            "format": "int32",
            "description": ""
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "schema": {
              "$ref": "#/definitions/Incomeandexpensesdisplayed"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "currentBalance": 990,
                "incomes": [
                  {
                    "income": {
                      "type": "Income",
                      "amount": 40,
                      "description": "urgent 40",
                      "currentBalance": "1040",
                      "createdAt": "2023-03-19T16:31:28.391Z"
                    }
                  }
                ],
                "expenses": [
                  {
                    "expense": {
                      "amount": 50,
                      "description": "bought garri",
                      "currentBalance": "990",
                      "createdAt": "2023-03-19T16:32:11.490Z"
                    }
                  }
                ]
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "294"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"126-Ks2hsMiosO46XnnVw4i5w6oem4E\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:32:46 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/Invalidauthtoken1"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "error": "Unauthorized"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "24"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"18-XPDV80vbMk4yY1/PADG4jYM4rSI\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:45:47 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          }
        },
        "security": []
      }
    },
    "/track/income": {
      "post": {
        "description": "## Income add request\n\nThis request adds the users income and descriptoion to the database and returns a success message.\n\nIf `user` isn't logged in, `user` is unauthorized and will be redirected to home page",
        "summary": "Add income",
        "tags": [
          "Track Income and Exp"
        ],
        "operationId": "Addincome",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "parameters": [
          {
            "name": "Body",
            "in": "body",
            "required": true,
            "description": "",
            "schema": {
              "$ref": "#/definitions/AddincomeRequest"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created",
            "schema": {
              "$ref": "#/definitions/IncomeAdded"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "message": "success"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "21"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"15-ga8EF/lp+ThIsc8w/OHbk4hPrME\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:31:28 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/Invalidauthtoken1"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "error": "Unauthorized"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "24"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"18-XPDV80vbMk4yY1/PADG4jYM4rSI\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:46:26 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          }
        },
        "security": []
      }
    },
    "/track/expense": {
      "post": {
        "description": "## Expense only Request\n\nThis request adds the `user` expense and descriptoion to the database and returns a success message.\n\nIf `user` isn't logged in, `user` is unauthorized and will be redirected to home page",
        "summary": "Add expense",
        "tags": [
          "Track Income and Exp"
        ],
        "operationId": "Addexpense",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "parameters": [
          {
            "name": "Body",
            "in": "body",
            "required": true,
            "description": "",
            "schema": {
              "$ref": "#/definitions/AddexpenseRequest"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created",
            "schema": {
              "$ref": "#/definitions/Expenseadded"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "message": "success"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "21"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"15-ga8EF/lp+ThIsc8w/OHbk4hPrME\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:32:11 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/Invalidauthtoken1"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "error": "Unauthorized"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "24"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"18-XPDV80vbMk4yY1/PADG4jYM4rSI\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:46:43 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          }
        },
        "security": []
      }
    },
    "/track/balance": {
      "post": {
        "description": "## Track Balance request\n\nThis request add the currentBalance gotten to be the starting balance in the users dashboard.\n\nIt takes in a filed `currentBalance` which is give an number to add to the database",
        "summary": "Add user balance",
        "tags": [
          "Track Income and Exp"
        ],
        "operationId": "Adduserbalance",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "parameters": [
          {
            "name": "Body",
            "in": "body",
            "required": true,
            "description": "",
            "schema": {
              "$ref": "#/definitions/AdduserbalanceRequest"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Created",
            "schema": {
              "$ref": "#/definitions/Trackingbalanceadded"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "message": "success"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "21"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"15-ga8EF/lp+ThIsc8w/OHbk4hPrME\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:29:22 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/Invalidauthtoken1"
            },
            "examples": {
              "application/json; charset=utf-8": {
                "error": "Unauthorized"
              }
            },
            "headers": {
              "X-Powered-By": {
                "type": "string",
                "default": "Express"
              },
              "Access-Control-Allow-Origin": {
                "type": "string",
                "default": "*"
              },
              "Content-Length": {
                "type": "string",
                "default": "24"
              },
              "ETag": {
                "type": "string",
                "default": "W/\"18-XPDV80vbMk4yY1/PADG4jYM4rSI\""
              },
              "Date": {
                "type": "string",
                "default": "Sun, 19 Mar 2023 16:48:19 GMT"
              },
              "Connection": {
                "type": "string",
                "default": "keep-alive"
              },
              "Keep-Alive": {
                "type": "string",
                "default": "timeout=5"
              }
            }
          }
        },
        "security": []
      }
    }
  },
  "definitions": {
    "Userexists1": {
      "title": "Userexists1",
      "example": {
        "error": "User already exists"
      },
      "type": "object",
      "properties": {
        "error": {
          "type": "string"
        }
      },
      "required": [
        "error"
      ]
    },
    "RegistrationSuccess": {
      "title": "RegistrationSuccess",
      "example": {
        "message": "success"
      },
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      },
      "required": [
        "message"
      ]
    },
    "Invalidorexpiredtoken1": {
      "title": "Invalidorexpiredtoken1",
      "example": {
        "error": "Unauthorized"
      },
      "type": "object",
      "properties": {
        "error": {
          "type": "string"
        }
      },
      "required": [
        "error"
      ]
    },
    "Invalidtokenpassed1": {
      "title": "Invalidtokenpassed1",
      "example": {
        "error": "Forbidden"
      },
      "type": "object",
      "properties": {
        "error": {
          "type": "string"
        }
      },
      "required": [
        "error"
      ]
    },
    "Validtokenpassed": {
      "title": "Validtokenpassed",
      "example": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZhMzJmMzExM2NlOWRkNzM0Y2JkMyIsImlhdCI6MTY3OTI0Mjk5NiwiZXhwIjoxNjc5MjQzODk2fQ._fyodqiVAtvOL8gqYlY1-oEzE35HKBmYdOzw-XmdQHk"
      },
      "type": "object",
      "properties": {
        "accessToken": {
          "type": "string"
        }
      },
      "required": [
        "accessToken"
      ]
    },
    "ForgotPassword": {
      "title": "ForgotPassword",
      "example": {
        "message": "success"
      },
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      },
      "required": [
        "message"
      ]
    },
    "Userloggedin": {
      "title": "Userloggedin",
      "example": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTZhMzJmMzExM2NlOWRkNzM0Y2JkMyIsImlhdCI6MTY3OTI0MjM5NiwiZXhwIjoxNjc5MjQzMjk2fQ.neIJoXt3KDIqqUoyiyFXsD2Qml8IuXW_LG_nmbP_5cE"
      },
      "type": "object",
      "properties": {
        "accessToken": {
          "type": "string"
        }
      },
      "required": [
        "accessToken"
      ]
    },
    "Invalidpasswordoremail1": {
      "title": "Invalidpasswordoremail1",
      "example": {
        "error": "Invalid email or password"
      },
      "type": "object",
      "properties": {
        "error": {
          "type": "string"
        }
      },
      "required": [
        "error"
      ]
    },
    "ResetpasswordRequest": {
      "title": "ResetpasswordRequest",
      "example": {
        "newPassword": "goodboy",
        "confirmPassword": "goodboy",
        "resetToken": "2a47e9d9083faa331a4021e5a3781ddf48a86e5cb9a9351c965ec87dffdd"
      },
      "type": "object",
      "properties": {
        "newPassword": {
          "type": "string"
        },
        "confirmPassword": {
          "type": "string"
        },
        "resetToken": {
          "type": "string"
        }
      },
      "required": [
        "newPassword",
        "confirmPassword",
        "resetToken"
      ]
    },
    "Invalidrefreshtoken1": {
      "title": "Invalidrefreshtoken1",
      "example": {
        "error": "Unauthorized"
      },
      "type": "object",
      "properties": {
        "error": {
          "type": "string"
        }
      },
      "required": [
        "error"
      ]
    },
    "Incomeandexpensesdisplayed": {
      "title": "Incomeandexpensesdisplayed",
      "example": {
        "currentBalance": 990,
        "incomes": [
          {
            "income": {
              "type": "Income",
              "amount": 40,
              "description": "urgent 40",
              "currentBalance": "1040",
              "createdAt": "2023-03-19T16:31:28.391Z"
            }
          }
        ],
        "expenses": [
          {
            "expense": {
              "amount": 50,
              "description": "bought garri",
              "currentBalance": "990",
              "createdAt": "2023-03-19T16:32:11.490Z"
            }
          }
        ]
      },
      "type": "object",
      "properties": {
        "currentBalance": {
          "type": "integer",
          "format": "int32"
        },
        "incomes": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Income"
          }
        },
        "expenses": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Expense"
          }
        }
      },
      "required": [
        "currentBalance",
        "incomes",
        "expenses"
      ]
    },
    "Income": {
      "title": "Income",
      "example": {
        "income": {
          "type": "Income",
          "amount": 40,
          "description": "urgent 40",
          "currentBalance": "1040",
          "createdAt": "2023-03-19T16:31:28.391Z"
        }
      },
      "type": "object",
      "properties": {
        "income": {
          "type": "object",
          "allOf": [
            {
              "$ref": "#/definitions/Income1"
            },
            {}
          ]
        }
      },
      "required": [
        "income"
      ]
    },
    "Income1": {
      "title": "Income1",
      "example": {
        "type": "Income",
        "amount": 40,
        "description": "urgent 40",
        "currentBalance": "1040",
        "createdAt": "2023-03-19T16:31:28.391Z"
      },
      "type": "object",
      "properties": {
        "type": {
          "type": "string"
        },
        "amount": {
          "type": "integer",
          "format": "int32"
        },
        "description": {
          "type": "string"
        },
        "currentBalance": {
          "type": "string"
        },
        "createdAt": {
          "type": "string"
        }
      },
      "required": [
        "type",
        "amount",
        "description",
        "currentBalance",
        "createdAt"
      ]
    },
    "Expense": {
      "title": "Expense",
      "example": {
        "expense": {
          "amount": 50,
          "description": "bought garri",
          "currentBalance": "990",
          "createdAt": "2023-03-19T16:32:11.490Z"
        }
      },
      "type": "object",
      "properties": {
        "expense": {
          "type": "object",
          "allOf": [
            {
              "$ref": "#/definitions/Expense1"
            },
            {}
          ]
        }
      },
      "required": [
        "expense"
      ]
    },
    "Expense1": {
      "title": "Expense1",
      "example": {
        "amount": 50,
        "description": "bought garri",
        "currentBalance": "990",
        "createdAt": "2023-03-19T16:32:11.490Z"
      },
      "type": "object",
      "properties": {
        "amount": {
          "type": "integer",
          "format": "int32"
        },
        "description": {
          "type": "string"
        },
        "currentBalance": {
          "type": "string"
        },
        "createdAt": {
          "type": "string"
        }
      },
      "required": [
        "amount",
        "description",
        "currentBalance",
        "createdAt"
      ]
    },
    "Invalidauthtoken1": {
      "title": "Invalidauthtoken1",
      "example": {
        "error": "Unauthorized"
      },
      "type": "object",
      "properties": {
        "error": {
          "type": "string"
        }
      },
      "required": [
        "error"
      ]
    },
    "AddincomeRequest": {
      "title": "AddincomeRequest",
      "example": {
        "amount": 40,
        "description": "urgent 40"
      },
      "type": "object",
      "properties": {
        "amount": {
          "type": "integer",
          "format": "int32"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "amount",
        "description"
      ]
    },
    "IncomeAdded": {
      "title": "IncomeAdded",
      "example": {
        "message": "success"
      },
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      },
      "required": [
        "message"
      ]
    },
    "AddexpenseRequest": {
      "title": "AddexpenseRequest",
      "example": {
        "amount": 50,
        "description": "bought garri"
      },
      "type": "object",
      "properties": {
        "amount": {
          "type": "integer",
          "format": "int32"
        },
        "description": {
          "type": "string"
        }
      },
      "required": [
        "amount",
        "description"
      ]
    },
    "Expenseadded": {
      "title": "Expenseadded",
      "example": {
        "message": "success"
      },
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      },
      "required": [
        "message"
      ]
    },
    "AdduserbalanceRequest": {
      "title": "AdduserbalanceRequest",
      "example": {
        "currentBalance": 1000
      },
      "type": "object",
      "properties": {
        "currentBalance": {
          "type": "integer",
          "format": "int32"
        }
      },
      "required": [
        "currentBalance"
      ]
    },
    "Trackingbalanceadded": {
      "title": "Trackingbalanceadded",
      "example": {
        "message": "success"
      },
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      },
      "required": [
        "message"
      ]
    }
  },
  "security": [],
  "tags": [
    {
      "name": "User Auth",
      "description": "**Contains the apis responsible for the authentication of the kudiflow application**"
    },
    {
      "name": "Track Income and Exp",
      "description": "Contains all the api required for the logic of the `Track` feature page implemented in the `KudiFlow` application"
    }
  ]
}

module.exports = swaggerDef;
