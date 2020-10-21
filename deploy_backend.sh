cd frontend
sudo npm install
sudo npm run build
cd ../backend
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 170263725750.dkr.ecr.us-east-1.amazonaws.com
docker build -t burning-backend .
docker tag burninup-backend:latest 170263725750.dkr.ecr.us-east-1.amazonaws.com/burninup-backend:latest
docker push 170263725750.dkr.ecr.us-east-1.amazonaws.com/burninup-backend:latest
pip3 install awsebcli
cd aws_deploy
#eb init
eb deploy --staged

