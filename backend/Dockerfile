# Sets up a python and linux environment
FROM python:alpine3.11

# Creates the docker directory
COPY . /backend
WORKDIR /backend

# Installs python packages
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Exposes port 5000 which Flask app will use to the container so that later it can be mapped with the system’s port
EXPOSE 5000

# Runs <python demo.py>
ENTRYPOINT [ "python" ]

CMD [ "./backend/main.py" ]