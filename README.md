# FSIII_Tienda
FSIII - SUMATIVA - Angular

# Angular
ng serve

# Dockerfile
docker build -t tienda-web .
docker run --name tienda-web -p 8080:80 tienda-web

# Revisar covertura de testing
ng test --code-coverage

# Usar Sonarqube
1. Crear contenedor de SonarQube.
2. Configurar session y optener token para proyecto.
3. Intalar  scanner de Sonarqube globalmente.
    - npm install -g sonar-scanner
4. Crea un archivo en la raiz del proyecto llamado sonar-project.properties.
5. Genera el reporte de cobertura.
    - ng test --code-coverage --no-watch
6. Ejecuta el analisis
    - sonar-scanner
7. El comando completo seria.
    - sonar-scanner.bat -D"sonar.projectKey=FSIII_TIENDA" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.token=sqp_2e0880e03ea5a21159be1567afe63e82690490e5"