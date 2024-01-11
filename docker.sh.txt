#!/bin/bash

########################################################################[Variables_File]###########################################################################################
#Docker Engine Version
VERSION_STRING="5:24.0.0-1~ubuntu.22.04~jammy"

#Cloning Repo
CLONE_REPO="https://github.com/Uj5Ghare/Node-Freelancing-App.git"
CHANGE_DIR="./Node-Freelancing-App"

#Creating Dockerfile Building Image
BASE_IMAGE="node:18-alpine"
WORKING_DIR="/app"
COPY_FROM="."
COPY_TO="/app"
RUN="npm install express && npm init -y && npm install"
PORT="3000"
CMD='["node","app.js"]'

#Create docker image & run container
BUILD_IMAGE="node-app"
CON_NAME="node-con"
NETWORK="node-net"
ENV1="DEBUG=True"
ENV2="MY_APP=node-app"
ENV3="MY_APP_VERSION=18-alpine"
VOLUME="./volume:/volume"
PORTS="3000:3000"

#Storing image
DOCKER_USERNAME="uj5ghare"
DOCKER_PASSWORD="dckr_pat_G4VtAB3LrJ86uNGX5uAK23qoxaA"
STORE_IMAGE="uj5ghare/node-app:latest"



######################################################################[Shell_Script_for_Docker]####################################################################################

echo "----------------------------------------------------------------"
#Add Docker's official GPG key
sudo apt-get update --upgrade -y
sudo apt-get install ca-certificates curl gnupg -y
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "----------------------------------------------------------------"
#Add the repository to Apt sources

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y

echo "----------------------------------------------------------------"
# To install a specific version of Docker Engine

sudo apt-get install docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io docker-buildx-plugin docker-compose-plugin -y
sudo docker --version

# If you use an Ubuntu derivative distro, such as Linux Mint, you may need to use UBUNTU_CODENAME instead of VERSION_CODENAME
echo "----------------------------------------------------------------"
#If Git is not present in machine, use below command
sudo apt-get install git-all -y

echo "----------------------------------------------------------------"
#Creating Dockerfile

sudo git clone  $CLONE_REPO
cd $CHANGE_DIR
sudo cat > Dockerfile <<EOF
FROM $BASE_IMAGE
WORKDIR $WORKING_DIR
COPY $COPY_FROM $COPY_TO
RUN $RUN
EXPOSE $PORT
CMD $CMD
EOF

echo "----------------------------------------------------------------"
#Building Dockerfile

sudo docker build -t $BUILD_IMAGE .
sudo docker network create  $NETWORK
sudo docker rm -f $CON_NAME
sudo docker run -d --name $CON_NAME  --net $NETWORK -e $ENV1 -e $ENV2 -e $ENV3  -v $VOLUME -p $PORTS $BUILD_IMAGE
sudo docker tag $BUILD_IMAGE $STORE_IMAGE


echo "----------------------------------------------------------------"
#Login To Docker Registry"

sudo echo $DOCKER_PASSWORD | sudo docker login --username $DOCKER_USERNAME --password-stdin
# sudo echo $DOCKER_PASSWORD | sudo docker login --username $DOCKER_USERNAME --password-stdin docker.io
echo "----------------------------------------------------------------"
#Pushing Image to Docker Registry

sudo docker push $STORE_IMAGE

echo "SUCCESS"
echo "----------------------------------------------------------------"

