# Sets up a python and linux environment
FROM python:alpine3.11

# Creates the docker directory
COPY . /backend
WORKDIR /backend

# Installs python packages
RUN pip install -r ./backend/requirements.txt

# Exposes port 5001 which Flask app will use to the container so that later it can be mapped with the system’s port
EXPOSE 5000

# Runs <python demo.py>
ENTRYPOINT [ "python" ] 

CMD [ "demo.py" ] 