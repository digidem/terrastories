FROM ruby:2.5.9-alpine
# ARG precompileassets="not"
ARG precompileassets
RUN apk --no-cache add --update \
    build-base \
    linux-headers \
    less \
    nodejs \
    python2 \
    yarn \
    tzdata \
    postgresql-dev \
    postgresql-client \
    postgresql \
    python2 \
    libffi \
    libxml2-dev \
    libxslt-dev \
    libc6-compat \
    imagemagick \
    ffmpeg && \
    gem update --system --no-document && \
    gem install bundler --no-document --force

WORKDIR /api

COPY Gemfile* /api/
RUN bundle update rake && bundle config set --local path /usr/local/bundle && \
    bundle config build.nokogiri --use-system-libraries && \
    bundle install

COPY . /api

CMD ["scripts/server"]
