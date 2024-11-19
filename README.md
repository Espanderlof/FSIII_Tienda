# FSIII_Tienda
FSIII - SUMATIVA - Angular

# Construir la imagen
docker build -t tienda-web .

# Ejecutar el contenedor
docker run --name tienda-web -p 8080:80 tienda-web