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
                sh 'mkdir -p /var/www/phishguard'
                sh 'cp -r frontend/build/* /var/www/phishguard'
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