FROM python:3.9

WORKDIR /app
RUN pip install --upgrade pip

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

ENV PYTHONPATH "${PYTHONPATH}:/app:/app/universityService"

COPY . ./universityService

CMD ls

CMD python ./universityService/main.py