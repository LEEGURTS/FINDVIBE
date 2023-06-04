#!/bin/bash
#local에서
if [ $1 == "build" ]; then
  sudo docker build -t hungkunge/findvibe_nodejs -f docker/findvibe/Dockerfile .
elif [ $1 == "reset" ]; then
  sudo docker rm -f $(docker ps -qa);
  sudo docker image rm -f $(docker image ls -q);
elif [ $1 == "push" ]; then
  docker push hungkunge/findvibe_nodejs;

#ec2에서
elif [ $1 == "pull" ]; then
  sudo docker pull hungkunge/findvibe_nodejs;
elif [ $1 == "run" ]; then
  sudo docker run -d -p 5000:5000 --network=host hungkunge/findvibe_nodejs;
elif [ $1 == "stop" ]; then
  sudo docker stop $(sudo docker ps -aq);
else
  echo "wrong command!";
fi