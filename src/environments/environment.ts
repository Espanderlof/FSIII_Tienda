export const environment = {
  production: false,
  apis: {
    usuarios: {
      baseUrl: 'http://localhost:8081/api',
      // baseUrl: 'http://ip172-18-0-36-ctcev70l2o9000agp2v0-8081.direct.labs.play-with-docker.com/api',
      endpoints: {
        base: 'usuarios',
        login: 'usuarios/login',
        registro: 'usuarios',
        actualizar: 'usuarios',
        eliminar: 'usuarios',
        obtenerTodos: 'usuarios',
        obtenerPorId: 'usuarios',
        resetPassword: 'usuarios'
      }
    },
    productos: {
      baseUrl: 'http://localhost:8082/api',
      // baseUrl: 'http://ip172-18-0-31-ctcev70l2o9000agp2v0-8082.direct.labs.play-with-docker.com/api',
      endpoints: {
        base: 'productos',
        categoria: 'productos/categoria',
        buscar: 'productos/buscar',
        stock: 'productos/stock'
      }
    },
    ordenes: {
      baseUrl: 'http://localhost:8083/api',
      // baseUrl: 'http://ip172-18-0-51-ctcev70l2o9000agp2v0-8083.direct.labs.play-with-docker.com/api',
      endpoints: {
        base: 'orders',
        usuario: 'orders/user',
        estado: 'orders/status'
      }
    }
  }
};