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
# ENTRYPOINT [ "flask" ]
# CMD [ "./backend/main.py" ]

ENTRYPOINT ["flask"]
CMD ["run", '--host=0.0.0.0', '--port=5000']