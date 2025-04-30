pipeline {
    agent any
    
    tools {
        nodejs 'Node18' // Updated to match the configured name in Jenkins
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Get code from your repository
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                dir('frontend') {
                    sh 'npm test -- --watchAll=false'
                }
            }
        }
        
        stage('Build') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                // Replace with your actual deployment steps
                // This is an example for copying to a deploy directory
                withCredentials([sshUserPrivateKey(credentialsId: 'deploy-ssh-key', keyFileVariable: 'SSH_KEY')]) {
                    sh 'scp -i $SSH_KEY -r frontend/build/* deployment-user@your-server:/var/www/phishguard'
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Build or deployment failed'
        }
    }
}