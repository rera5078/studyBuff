FROM python:3.8

WORKDIR /mlEngine
RUN pip install --upgrade pip

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

EXPOSE 9000

COPY . .

ENV PYTHONPATH "${PYTHONPATH}:/app:/mlEngine/src"

CMD python src/main.py