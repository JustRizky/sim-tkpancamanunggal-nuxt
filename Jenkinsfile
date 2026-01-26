pipeline {
    agent any

    environment {
        NUXT_TELEMETRY_DISABLED = '1'
        NUXT_EXPERIMENTAL_OXC = '0'
        SONAR_TOKEN = credentials('SONAR_TOKEN')
        DOCKER_USERNAME = credentials('DOCKER_USERNAME')
        DOCKER_PASSWORD = credentials('DOCKER_PASSWORD')
        STAGING_DATABASE_URL = credentials('STAGING_DATABASE_URL')
        STAGING_JWT_SECRET = credentials('STAGING_JWT_SECRET')
        DISCORD_WEBHOOK = credentials('DISCORD_WEBHOOK')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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

        stage('Run unit test with coverage') {
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

        stage('Staging Deployment') {
            steps {
                script {
                    docker.image('mysql:8').withRun('-e MYSQL_ROOT_PASSWORD=admin123 -e MYSQL_DATABASE=tkpancamanunggal') { mysqlContainer ->
                        docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                            docker.build('anandamrkl/tkpancamanunggal:staging')
                        }

                        writeFile file: '.env.staging', text: """
                            DATABASE_URL=${STAGING_DATABASE_URL}
                            JWT_SECRET=${STAGING_JWT_SECRET}
                            NODE_ENV=staging
                            PORT=3000
                        """

                        sh '''
                            docker run -d --name tkpancamanunggal-staging \
                            -p 3000:3000 \
                            --env-file .env.staging \
                            anandamrkl/tkpancamanunggal:staging
                        '''

                        sleep 15
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                withCredentials([string(credentialsId: 'DISCORD_WEBHOOK', variable: 'DISCORD_WEBHOOK')]) {
                    def message = '{"content": "CI and Staging Pipeline SUCCESS"}'
                    sh "curl -H 'Content-Type: application/json' -d '${message}' ${DISCORD_WEBHOOK}"
                }
            }
        }
        failure {
            script {
                withCredentials([string(credentialsId: 'DISCORD_WEBHOOK', variable: 'DISCORD_WEBHOOK')]) {
                    def message = '{"content": "CI and Staging Pipeline FAILED"}'
                    sh "curl -H 'Content-Type: application/json' -d '${message}' ${DISCORD_WEBHOOK}"
                }
            }
        }
    }
}

