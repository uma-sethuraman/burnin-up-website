# Sets up a python and linux environment
FROM nikolaik/python-nodejs

# Install Curl, Git, OpenSSL (AWS Amplify requirements) 
RUN apt-get install curl 
RUN apt-get install git 
RUN apt-get install openssl 

# Creates the docker directory
COPY . /app
RUN ls
WORKDIR /app

# Installs python packages
RUN pip install -r requirements.txt
RUN pip3 install psycopg2

# Exposes port 5000 which Flask app will use to the container so that later it can be mapped with the system’s port
EXPOSE 5000

COPY . /app

CMD ["gunicorn", "wsgi:app", "-w 2", "-b 0.0.0.0:5000", "-t 30"]