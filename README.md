Welcome to my term project for Operating Systems 4320-15430, Spring 2023

Deployment: https://os4320-project.fly.dev/

Included in this repository is the code written to power the app, but in order for the app to function as intended you will need to follow the deployment link above.

It is possible to run the project locally, though it would defeat the purpose of examining cloud computing protocol data, as many of the calls would be to a server hosted on the local machine. However, if it is necessary to varify that the code is genuine and matches the deployed app, please follow the instructions below:

1. Clone this repository onto your local machine.

2. Create 2 separate terminal windows and navigate to the project directory in both.

3. In the first terminal, navigate to the "backend" directory. If you are on MacOS or Linux, enter the following commands:

```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
```

4. If you are working on Windows, run these commands instead:

```
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

5. This will create a Python virtual environment and install all of the dependencies need for the backend Flask server to function. Next run the following command: `flask run` This will begin the backend server on port 5000.

6. In your second terminal window, run the following command: `npm start` or `yarn start` This will run the frontend server that will allow you to access the app on your browser at localhost/3000.

Thanks for taking a look at my work. Have a great summer!
