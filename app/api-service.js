// Servicios para manejo de API
import { apiService } from './api-config.js';

// Servicio de autenticación
export const authService = {
    // Iniciar sesión
    async login(email, password) {
        try {
            const response = await apiService.auth.login(email, password);
            
            // Guardar token y datos del usuario
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userData', JSON.stringify({
                    email: response.email,
                    name: response.name,
                    lastName: response.lastName,
                    issuedAt: response.issuedAt,
                    expiresAt: response.expiresAt
                }));
                
                // Actualizar el estado de validación del usuario
                const mtbValidateUser = [{
                    id: response.email, // Usar email como identificador único
                    verification: true,
                    name: response.name,
                    lastName: response.lastName
                }];
                localStorage.setItem("mtbCheck", JSON.stringify(mtbValidateUser));
                
                return { success: true, data: response };
            }
            
            return { success: false, error: 'Invalid response format' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Registrar usuario
    async register(userData) {
        try {
            const registerData = {
                username: userData.username || userData.name, // El backend espera username
                email: userData.email,
                password: userData.password,
                name: userData.name,
                lastName: userData.surname || userData.lastName || '',
                address: userData.address || 'Sin dirección',
                phone: userData.phone || '0000000000'
            };
            
            const response = await apiService.auth.register(registerData);
            
            // El backend devuelve un token automáticamente después del registro
            if (response.token) {
                localStorage.setItem('authToken', response.token);
                localStorage.setItem('userData', JSON.stringify({
                    email: response.email,
                    name: response.name,
                    lastName: response.lastName,
                    issuedAt: response.issuedAt,
                    expiresAt: response.expiresAt
                }));
                
                // Actualizar el estado de validación del usuario
                const mtbValidateUser = [{
                    id: response.email,
                    verification: true,
                    name: response.name,
                    lastName: response.lastName
                }];
                localStorage.setItem("mtbCheck", JSON.stringify(mtbValidateUser));
                
                return { success: true, data: response };
            }
            
            return { success: false, error: 'Invalid response format' };
        } catch (error) {
            console.error('Register error:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Validar token
    async validateToken() {
        try {
            const response = await apiService.auth.validateToken();
            return { success: true, data: response };
        } catch (error) {
            console.error('Token validation error:', error);
            // Si el token no es válido, limpiar localStorage
            this.logout();
            return { success: false, error: error.message };
        }
    },
    
    // Cerrar sesión
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        
        // Limpiar el estado de validación
        const mtbValidateUser = [{
            id: null,
            verification: false
        }];
        localStorage.setItem("mtbCheck", JSON.stringify(mtbValidateUser));
    },
    
    // Verificar si el usuario está autenticado
    isAuthenticated() {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        return token && userData;
    },
    
    // Obtener datos del usuario actual
    getCurrentUser() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }
};

// Servicio de productos
export const productService = {
    // Obtener todos los productos
    async getAllProducts() {
        try {
            const products = await apiService.products.getAll();
            
            // Transformar los datos del backend al formato esperado por el frontend
            const transformedProducts = products.map(product => ({
                id: product.id_Product || product.id,
                img: product.imageUrl || "../img/IMG_003.png", // Imagen por defecto
                title: product.name || product.title,
                description: product.description,
                price: product.price,
                category: product.category?.name?.toLowerCase() || 'accesorio',
                type: product.type || 'unisex',
                stock: product.stock || 0
            }));
            
            // Guardar en localStorage para compatibilidad con el código existente
            localStorage.setItem("mtbCatalog", JSON.stringify(transformedProducts));
            
            return { success: true, data: transformedProducts };
        } catch (error) {
            console.error('Error fetching products:', error);
            
            // En caso de error, usar datos por defecto si existen
            const fallbackProducts = JSON.parse(localStorage.getItem("mtbCatalog")) || [];
            return { success: false, error: error.message, data: fallbackProducts };
        }
    },
    
    // Obtener producto por ID
    async getProductById(id) {
        try {
            const product = await apiService.products.getById(id);
            return { success: true, data: product };
        } catch (error) {
            console.error('Error fetching product:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Crear producto (solo admin)
    async createProduct(productData) {
        try {
            const backendProduct = {
                name: productData.title,
                description: productData.description,
                price: productData.price,
                stock: productData.stock,
                imageUrl: productData.img || "../img/IMG_003.png",
                // Agregar categoría si tienes el endpoint
                // categoryId: productData.categoryId
            };
            
            const response = await apiService.products.create(backendProduct);
            return { success: true, data: response };
        } catch (error) {
            console.error('Error creating product:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Actualizar producto (solo admin)
    async updateProduct(id, productData) {
        try {
            const backendProduct = {
                name: productData.title,
                description: productData.description,
                price: productData.price,
                stock: productData.stock,
                imageUrl: productData.img
            };
            
            const response = await apiService.products.update(id, backendProduct);
            return { success: true, data: response };
        } catch (error) {
            console.error('Error updating product:', error);
            return { success: false, error: error.message };
        }
    },
    
    // Eliminar producto (solo admin)
    async deleteProduct(id) {
        try {
            const response = await apiService.products.delete(id);
            return { success: true, data: response };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, error: error.message };
        }
    }
};

// Función para inicializar la aplicación con datos del backend
export async function initializeApp() {
    console.log('Initializing app with backend data...');
    
    // Validar token si existe
    if (authService.isAuthenticated()) {
        const validation = await authService.validateToken();
        if (!validation.success) {
            console.log('Token validation failed, user logged out');
        }
    }
    
    // Cargar productos del backend
    const productsResult = await productService.getAllProducts();
    if (productsResult.success) {
        console.log('Products loaded from backend:', productsResult.data.length);
    } else {
        console.log('Failed to load products from backend, using fallback data');
    }
    
    return {
        authenticated: authService.isAuthenticated(),
        productsLoaded: productsResult.success,
        productCount: productsResult.data.length
    };
}