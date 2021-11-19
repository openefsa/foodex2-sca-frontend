#!/bin/bash  
mkdir .gitpod
curl -L https://api.github.com/repos/fntlnz/gitpod-k3s/tarball | tar -xzC .gitpod --wildcards "*/.gitpod/*.sh" --strip-components=2


# kernel dev environment
sudo apt update -y
sudo apt install qemu qemu-system-x86 linux-image-$(uname -r) libguestfs-tools sshpass netcat -y
sudo curl -o /usr/bin/kubectl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo chmod +x /usr/bin/kubectl
.gitpod/prepare-rootfs.sh && .gitpod/qemu.sh &
# prepare k3s
.gitpod/prepare-k3s.sh

# create docker image
docker build -t foodex2sca:front . 
mkdir .images
# save docker image
docker save foodex2sca:front -o .images/foodex2sca-front.tar
# copy tar image into VM
.gitpod/scp.sh .images/foodex2sca-front.tar root@127.0.0.1:/home/foodex2sca-front.tar
.gitpod/ssh.sh "sudo k3s ctr images import /home/foodex2sca-front.tar"

# launch service
kubectl create -f ./manifests/deployment.local.yml
sleep 30
kubectl get pods
kubectl get services
SVC=$(kubectl get services -o=name | grep ^service/o )
kubectl port-forward $SVC 5432:8081 &
gp await-port 5432 && echo "k3s pod running..." && gp preview $(gp url 5432)
