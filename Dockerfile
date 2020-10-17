# Sets up a python and linux environment
FROM nikolaik/python-nodejs
FROM amazonlinux:2

# Install Curl, Git, OpenSSL (AWS Amplify requirements) and tar
RUN touch ~/.bashrc
RUN yum -y install
RUN yum install curl 
RUN yum install git 
RUN yum install openssl 
RUN yum clean all 
RUN rm -rf /var/cache/yum

# Creates the docker directory
COPY . /app
RUN ls
WORKDIR /app

# Installs python packages
RUN pip install -r ./backend/requirements.txt
RUN pip3 install psycopg2

#### Need to write npm run build ####
RUN cd ./frontend && npm install && npm run build

# # Configure environment
# RUN echo export PATH="\
#     /root/.nvm/versions/node/${VERSION_NODE}/bin:\
#     $PATH" >> ~/.bashrc && \
#     echo "nvm use ${VERSION_NODE} 1> /dev/null" >> ~/.bashrc

# Exposes port 5000 which Flask app will use to the container so that later it can be mapped with the system’s port
EXPOSE 5000

COPY . /app

# Runs <python main.py> when we start our terminal
ENTRYPOINT [ "python" ]
CMD [ "./backend/main.py" ]