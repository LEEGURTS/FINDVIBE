FROM python:latest As Server

WORKDIR /app/findvibe/predict

COPY predict/requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY predict/ ./

ENV FLASK_APP=main.py
ENV FLASK_ENV=development

# start the Flask application
CMD ["python3","main.py"]