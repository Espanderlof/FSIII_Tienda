import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Cargar usuario actual si existe
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }

      // Inicializar usuario administrador si no existe
      this.initializeAdminUser();
    }
  }

  private initializeAdminUser(): void {
    const users = this.getLocalStorage('users') || [];
    const adminExists = users.some((user: User) => user.email === 'admin');

    if (!adminExists) {
      const adminUser: User = {
        id: 1,
        nombre: 'Administrador',
        apellido: 'Sistema',
        email: 'admin',
        password: 'admin',
        direccion: 'Dirección Administrativa',
        telefono: '123456789',
        role: 'ADMIN',
        fechaCreacion: new Date(),
        ultimaActualizacion: new Date()
      };

      users.push(adminUser);
      this.setLocalStorage('users', users);
      console.log('Usuario administrador creado exitosamente');
    }
  }

  private getLocalStorage(key: string): any {
    if (isPlatformBrowser(this.platformId)) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  }

  private setLocalStorage(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  private removeLocalStorage(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  register(user: Omit<User, 'id' | 'fechaCreacion' | 'ultimaActualizacion' | 'role'>): Observable<User> {
    const users = this.getLocalStorage('users') || [];
    
    // Verificar si el email ya existe
    if (users.some((u: User) => u.email === user.email)) {
      throw new Error('El email ya está registrado');
    }

    const newUser: User = {
      ...user,
      id: users.length + 1,
      role: 'CLIENTE',
      fechaCreacion: new Date(),
      ultimaActualizacion: new Date()
    };

    users.push(newUser);
    this.setLocalStorage('users', users);
    return of(newUser);
  }

  login(email: string, password: string): Observable<User | null> {
    const users = this.getLocalStorage('users') || [];
    const user = users.find((u: User) => u.email === email && u.password === password);
    
    if (user) {
      this.setLocalStorage('currentUser', user);
      this.currentUserSubject.next(user);
    }
    
    return of(user || null);
  }

  logout(): void {
    this.removeLocalStorage('currentUser');
    this.currentUserSubject.next(null);
  }

  updateProfile(user: User): Observable<User> {
    const users = this.getLocalStorage('users') || [];
    const index = users.findIndex((u: User) => u.id === user.id);
    
    if (index !== -1) {
      users[index] = {
        ...user,
        ultimaActualizacion: new Date()
      };
      this.setLocalStorage('users', users);
      this.setLocalStorage('currentUser', users[index]);
      this.currentUserSubject.next(users[index]);
    }
    
    return of(users[index]);
  }

  resetPassword(email: string): Observable<boolean> {
    const users = this.getLocalStorage('users') || [];
    const userIndex = users.findIndex((u: User) => u.email === email);
    
    if (userIndex !== -1) {
      users[userIndex].password = '123456';
      this.setLocalStorage('users', users);
      return of(true);
    }
    
    return of(false);
  }
}