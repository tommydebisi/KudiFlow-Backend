const { version } = require('../../package.json');

const swaggerDef = {
  "swagger": "2.0",
  "info": {
    "version": `${version}`,
    "title": "KudiFlow",
    "description": "# KudiFlow API\n\n## Introduction\n\nKudiflow Api Documentation shows how to make use of the available API endpoints.\n\n## Overview\n\n_There are two subdivisons of the kudiflow api which are:_\n\n- User Auth - The entire authentication, and creation of a users in KudiFlow\n- Track Income and Exp - The entire backend logic of the track feature implemented in the **KudiFlow Application**",
    "contact": {}
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
        "description": "This endpoint creates a **user** account. This endpoint is to be called when a user wants to sign up.\n\nRequest Body parameters:\n\n| **Name** | **Data Type** | **Description** |\n| --- | --- | --- |\n| username | string | Name the user wants to be identified by |\n| email | string | Unique email provided by the user |\n| password | string | Password for the user to gain access to an account |",
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
        "description": "This endpoint logs out the user currently in session.",
        "summary": "Logout User",
        "tags": [
          "User Auth"
        ],
        "operationId": "LogoutUser",
        "deprecated": false,
        "produces": [
          "application/json; charset=utf-8"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          }
        ],
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
        }
      }
    },
    "/account/token-reset": {
      "get": {
        "description": "This endpoint gives a new access token for a **user** on request.\n\n**Note**\n\n- User must be signed in to a get a new access token.\n    \n\nRequest Body Parameters:\n\n| **Name** | **Data Type** | **Description** |\n| --- | --- | --- |\n| token | string | The access token a user receives on logging in. |",
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
        "description": "This endpoint mails the user with instructions to reset password forgotten.\n\nRequest Body Parameters:\n\n| **Name** | **Data Type** | **Description** |\n| --- | --- | --- |\n| email | string | Email linked with an account. |",
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
        "description": "This endpoint logs a registered user in.\n\nRequest Body Paramters:\n\n| **Name** | **Data Type** | **Description** |\n| --- | --- | --- |\n| email | string | Email used to register. |\n| password | string | Password used to register |",
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
        "description": "This endpoint resets the user's password.\n\nRequest Body Parameter:\n\n| **Name** | **Data Type** | **Description** |\n| --- | --- | --- |\n| newPassword | string | password to replace old one. |\n| confirmPassword | string | confirmation of the new password |\n| resetToken | string | token passed as a query parameter in the email sent to the user. |",
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
        "description": "This endpoint gets the list of `income` and `expense` for the current user as well as the updated current balance.\n\nURL Query Paramters:\n\n| **Name** | **Data Type** | **Required?** | **Default** | **Description** |\n| --- | --- | --- | --- | --- |\n| page | integer | No | 0 | Current page for the list of Income and Expenses |\n| limit | integer | No | 5 | Maximum number of Income and expenses per page |",
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
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          },
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
        }
      }
    },
    "/track/income": {
      "post": {
        "description": "This endpoint adds the user's income and description.\n\nRequest Body Parameters:\n\n| **Name** | **Data Type** | **Description** |\n| --- | --- | --- |\n| amount | integer | amount received |\n| description | string | details of the transaction |",
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
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          },
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
        }
      }
    },
    "/track/expense": {
      "post": {
        "description": "This endpoint adds the user's expense and description.\n\nRequest Body Parameters:\n\n| **Name** | **Data Type** | **Description** |\n| --- | --- | --- |\n| amount | integer | amount spent |\n| description | string | details of the transaction |",
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
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          },
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
        }
      }
    },
    "/track/balance": {
      "post": {
        "description": "This endpoint adds the user's starting balance to track.\n\n**NOTE:**\n\n- Use when the user wants to start tracking.\n    \n\n| **Name** | **Data Type** | **Description** |\n| --- | --- | --- |\n| currentBalance | integer | amount to start tracking |",
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
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          },
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
        }
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
      "description": "**Authentication APIs for the kudiflow application.**"
    },
    {
      "name": "Track Income and Exp",
      "description": "APIs for the`Track` feature implemented."
    }
  ]
}

module.exports = swaggerDef;
