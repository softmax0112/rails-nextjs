FROM ruby:2.7.1

RUN apt-get update
RUN apt-get install -y vim

ENV APP /usr/src/app
RUN mkdir $APP
WORKDIR $APP

COPY Gemfile* $APP/
RUN bundle install -j3 --path vendor/bundle 

COPY . $APP/

CMD ["./bin/server-dev"]