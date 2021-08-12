FROM catthehacker/ubuntu:act-20.04
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
RUN apt-get install nodejs
RUN npm install yarn@1.22.11 -g
# RUN yarn global add vercel@23.0.1
# RUN yarn global add create-react-app@4.0.3
# Use RUN su node -c "yarn global add create-react-app@4.0.3" - if running as node user
# Otherise builds will fail on CI system without warning as CRA treats warnings as errors
ENV CI=true