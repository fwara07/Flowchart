# How to run this project on a local computer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Runing the frontend

Open up a terminal, and use the command `git clone https://github.com/fwara07/flowchart.git` to clone this repository.

Next, use the `cd` command to get into the cloned folder.

Once in the folder, use the command `npm install` to install all the dependencies.

Once the install is done, use the following command to start the frontend:

### `npm start`

**Note: you muse have Node.js install for these commands to work**

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Running the backend

The backend is already being hosted, but if you would like faster performance, then installing it localy would be the best option.

To install it locally, install the followig zip file:

### [flowchart_backend.zip](https://github.com/fwara07/flowchart/files/7438113/flowchart_backend.zip)

After the installation, `cd` into the downloaded directory and run the following command using a command prompt:

### `pip install pipenv`
### `pipenv shell`
### `pipenv install`
### `python manage.py makemigeations`
### `python manage.py migrate`
### `python manage.py runserver`

**Note: Python must be installed, for the commands above to work.

The backend should successfully be running now at the following url:

### [http://localhost:3000](http://localhost:3000)

However, to make it the two work together, you must change up the code a little.

### Navigate back to the fronted folder, and follow the following steps:

First, open up your preffered code editor, and navigate to `App.js`, `Sidebar.js` and `Canvas.js`.

On each of the files, there will be a variable called `apiUrl` in the first few lines of the file.

Once there, change the variable value to `http://127.0.0.1:8000`.

Repeat this process witht the rest of the filrs mention above.

### The application should successfully be running now!
