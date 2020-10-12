# Sets up a python and linux environment
#FROM python:alpine3.11
FROM nikolaik/python-nodejs

# Creates the docker directory

### want to copy the entire cs373-sustainabiltiy folder ###
COPY .. .
WORKDIR /backend

# Installs python packages
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install -r requirements.txt

#### Need to write npm run build ####
RUN cd .. /frontend  npm run build

# Exposes port 5000 which Flask app will use to the container so that later it can be mapped with the system’s port
EXPOSE 5000

# Runs <python main.py> when we start our terminal
ENTRYPOINT [ "python" ]
CMD [ "./backend/main.py" ]
