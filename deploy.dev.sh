mkdir build
bestzip build/service.zip dist/
aws s3 mb s3://poc-express-host/ --profile developer
aws s3 cp build/service.zip s3://poc-express-host/28112018/service.zip --profile developer
