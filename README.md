# Habits

[![Build Status](https://travis-ci.org/liamqma/habits.svg?branch=master)](https://travis-ci.org/liamqma/habits)

A completely free service which helps build good habits and break bad ones

## Why do I build this

I found 'divide and conquer' is best way for me to develop habits. New year resolution is wishful thinking. I need to set daily, weekly and monthly targets. Therefore, I need a Web/Native app as a reminder and results-checker. All the services I found are either poorly designed or paid. Hence, I've decided to build it.

## Usage

### 1. Create a habit you want to develop

![Create a habit](https://habits-ba846.firebaseapp.com/static/media/screenshot-1.9610a4df.gif)

### 2. Click on the habit to indicate you have done it today

![Click on a habit](https://habits-ba846.firebaseapp.com/static/media/screenshot-2.d1b8ee50.gif)

### 3. Show a graph of your commitment over the past year

![A graph of your commitment over the past year](https://habits-ba846.firebaseapp.com/static/media/screenshot-3.7c224cc0.png)

## Development

```
$ touch .env

# Fill in .env
REACT_APP_API_KEY=XXX
REACT_APP_AUTH_DOMAIN=XXX
REACT_APP_DATABASE_URL=XXX
REACT_APP_PROJECT_ID=XXX
REACT_APP_STORAGE_BUCKET=XXX
REACT_APP_MESSAGING_SENDER_ID=XXX
REACT_APP_APP_ID=XXX
REACT_APP_MEASUREMENT_ID=XXX

$ npm install

$ npm start
```

## TODO

-   ~~CI~~
-   Code coverage (Waiting for Jest 26 avilable in react-scripts)
-   ~~Github calendar contribution~~
-   ~~Congrate if all done~~
-   ~~Modal window~~
-   ~~Better 'add' and 'update' buttons~~
-   ~~Use it without login~~
-   ~~About: why the project exists~~
-   ~~Instructions~~
-   ~Complete a goal~
-   Add browser support to README
