# Sets up a python and linux environment
#FROM python:alpine3.11
FROM nikolaik/python-nodejs

RUN apt-get update
RUN apt-get install curl

# Creates the docker directory
COPY . /app
RUN ls
WORKDIR /app

# Installs python packages
RUN pip install -r ./backend/requirements.txt
RUN pip3 install psycopg2

# Install Curl, Git, OpenSSL (AWS Amplify requirements) and tar (required to install hugo)
RUN touch ~/.bashrc
RUN yum -y update && \
    yum -y install \
    curl \
    git \
    openssl \
    tar \
    yum clean all && \
    rm -rf /var/cache/yum

#### Need to write npm run build ####
RUN cd ./frontend && npm install && npm run build

# Configure environment
RUN echo export PATH="\
    /root/.nvm/versions/node/${VERSION_NODE}/bin:\
    $PATH" >> ~/.bashrc && \
    echo "nvm use ${VERSION_NODE} 1> /dev/null" >> ~/.bashrc

# Exposes port 5000 which Flask app will use to the container so that later it can be mapped with the system’s port
EXPOSE 5000

COPY . /app

# Runs <python main.py> when we start our terminal
ENTRYPOINT [ "python" ]
CMD [ "./backend/main.py" ]