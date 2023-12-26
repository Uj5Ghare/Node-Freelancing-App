pipeline {
    agent any 

    environment {
        SONAR_SERVER = "sonar-server"
        SONAR_SCANNER = "sonar-scanner"
        REGISTRY_REPO = "814495875142.dkr.ecr.ap-south-1.amazonaws.com/ec2-demo"
        REGISTRY_URL = "https://814495875142.dkr.ecr.ap-south-1.amazonaws.com"
        REGISTRY_CREDS = "ecr:ap-south-1:aws-creds" 
        CLUSTER = "my-cluster"
        SERVICE = "node-svc"
        }
    
    stages {
        stage {
            steps("Checkout") {
                git clone branch: "main", credentialId: "ssh-github", url: "git@github.com:Uj5Ghare/Node-Freelancing-App.git"
            }
        }

        stage("Build") {
            steps {
                sh 'npm install'
            }
        }

        stage("Code_Analysis") {
            environment {
                scannerHome = tool "${SONAR_SCANNER}"
            }
            steps {
                withSonarQubeEnv(${SONAR_SERVER}) {
                    sh '''${scannerHome}/bin/sonar-scanner \
                        -Dsonar.projectKey=node-key \
                        -Dsonar.projectName=Node-Project \
                        -Dsonar.projectVersion=1.0 '''
                }
            }
        }

        stage("Quality_Gates") {
            steps {
                timeout(10){
                    waitForQualityGate abortPipeline: true 
                }
            }
        }

        stage("Docker_Build_Img") {
            steps {
                script {
                    dockerImage = docker.build{REGISTRY_REPO, "./Dockerfile")
                }
            }
        }
         
        stage("Docker_Push_To_ECR") {
            steps {
                script {
                    docker.withRegistry(REGISTRY_URL, REGISTRY_CREDS)
                        dockerImage("$BUILD_NUMBER")
                }
            }
        }

        stage("Deploy_To_ECS") {
            steps {
                withAWS(credentials: "aws_creds", region: "ap-south-1") {
                    sh 'aws ecs update-service --cluster ${CLUSTER} --service ${SERVICE} --force-new-deployment'
                }
            }
        }
    }
}