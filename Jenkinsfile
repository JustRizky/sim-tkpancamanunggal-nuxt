pipeline {
    agent any

    environment {
        NUXT_TELEMETRY_DISABLED = '1'
        NUXT_EXPERIMENTAL_OXC = '0'
        SONAR_TOKEN = credentials('SONAR_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    sh 'curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -'
                    sh 'sudo apt-get install -y nodejs'
                }
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Prepare Nuxt') {
            steps {
                sh 'npx nuxt prepare'
            }
        }

        stage('Run unit tests with coverage') {
            steps {
                sh 'npm run test:coverage'
            }
        }

        stage('SonarCloud Scan') {
            steps {
                withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
                    sh '''
                        npx sonar-scanner -Dsonar.projectKey=your_project_key \
                                          -Dsonar.organization=your_organization \
                                          -Dsonar.host.url=https://sonarcloud.io
                    '''
                }
            }
        }

        stage('Run npm audit') {
            steps {
                sh 'npm audit --json > audit-report.json || true'
            }
        }

        stage('Upload npm audit report') {
            steps {
                archiveArtifacts artifacts: 'audit-report.json', allowEmptyArchive: true
            }
        }

        stage('Build project') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Upload build artifact') {
            steps {
                archiveArtifacts artifacts: '.output/**', allowEmptyArchive: true
            }
        }
    }
}

