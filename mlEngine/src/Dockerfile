FROM python:3.8

WORKDIR /app/mlEngine/src/
RUN pip install --upgrade pip

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

ENV PYTHONPATH "${PYTHONPATH}:/app:/app/mlEngine/src/"

COPY . .

CMD python main.py