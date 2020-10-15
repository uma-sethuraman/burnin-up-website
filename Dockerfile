# Sets up a python and linux environment
#FROM python:alpine3.11
FROM nikolaik/python-nodejs

# Creates the docker directory

### want to copy the entire cs373-sustainabiltiy folder ###
COPY . /app
RUN ls
WORKDIR /app

# Installs python packages
RUN pip install -r ./backend/requirements.txt
RUN pip3 install psycopg2
RUN pip3 install flask
RUN pip3 install flask-restful
RUN pip3 install SQLAlchemy
RUN pip3 install requests
RUN pip3 install flask-cors

#### Need to write npm run build ####
RUN cd ./frontend && npm install && npm run build

# Exposes port 5000 which Flask app will use to the container so that later it can be mapped with the system’s port
EXPOSE 5000

COPY . /app

# Runs <python main.py> when we start our terminal
ENTRYPOINT [ "python" ]
CMD [ "./backend/main.py" ]
