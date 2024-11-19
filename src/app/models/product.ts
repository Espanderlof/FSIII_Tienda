export interface Product {
    id: number;
    activo: number;  // 0 o 1
    categoria: string;
    descripcion: string;
    fechaCreacion: Date;
    imagenUrl?: string;  // opcional
    nombre: string;
    precio: number;
    stock: number;
    ultimaActualizacion?: Date;  // opcional
}