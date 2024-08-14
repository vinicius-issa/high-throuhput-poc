FROM ubuntu

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt update
RUN apt install hey


CMD ["hey", "-c", "2", "-z", "1m", "http://web"]