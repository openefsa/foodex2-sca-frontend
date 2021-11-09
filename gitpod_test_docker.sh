docker build -t openefsa/sca-frontend:1.6 .
docker image ls
docker run -d --rm -p 8081:8081 --name test-scafe openefsa/sca-frontend:1.6
gp await-port 8081 && echo "container running..." && gp preview $(gp url 8081)
docker ps
# sleep 5 min to allow for testing
sleep 300 && docker stop test-scafe && echo "container stopped!!!"
echo "start cleaning..." && docker image prune -a -f && echo "cleaning ended."