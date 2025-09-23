// Configuración de la API
export const API_CONFIG = {
    // URL del backend - cambiar según el entorno
    BASE_URL: 'http://localhost:8080', // Para desarrollo local
    // BASE_URL: 'https://8mq33rknsp.us-east-1.awsapprunner.com', // Para producción
    
    // Endpoints de la API
    ENDPOINTS: {
        // Autenticación
        AUTH: {
            LOGIN: '/rutamtb/auth/login',
            REGISTER: '/rutamtb/auth/register',
            VALIDATE: '/rutamtb/auth/validate'
        },
        // Productos
        PRODUCTS: {
            GET_ALL: '/rutamtb/products',
            GET_BY_ID: '/rutamtb/products/search',
            CREATE: '/rutamtb/products/create',
            UPDATE: '/rutamtb/products/update',
            DELETE: '/rutamtb/products/delete'
        },
        // Categorías
        CATEGORIES: {
            GET_ALL: '/rutamtb/categories',
            GET_BY_ID: '/rutamtb/categories/search',
            CREATE: '/rutamtb/categories/create',
            UPDATE: '/rutamtb/categories/update',
            DELETE: '/rutamtb/categories/delete'
        },
        // Usuarios
        USERS: {
            GET_ALL: '/rutamtb/users',
            GET_BY_ID: '/rutamtb/users/search',
            UPDATE: '/rutamtb/users/update',
            DELETE: '/rutamtb/users/delete'
        },
        // Órdenes
        ORDERS: {
            GET_ALL: '/rutamtb/orders',
            GET_BY_ID: '/rutamtb/orders/search',
            CREATE: '/rutamtb/orders/create',
            UPDATE: '/rutamtb/orders/update',
            DELETE: '/rutamtb/orders/delete'
        }
    }
};

// Función para obtener la URL completa de un endpoint
export function getApiUrl(endpoint) {
    return API_CONFIG.BASE_URL + endpoint;
}

// Función para detectar el entorno y configurar la URL base automáticamente
export function detectEnvironment() {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        API_CONFIG.BASE_URL = 'http://localhost:8080';
    } else if (hostname.includes('amplifyapp.com')) {
        // Backend desplegado en AWS App Runner
        API_CONFIG.BASE_URL = 'https://8mq33rknsp.us-east-1.awsapprunner.com';
    }
    
    console.log('API Base URL configured to:', API_CONFIG.BASE_URL);
}

// Función para hacer peticiones HTTP con manejo de errores mejorado
export async function apiRequest(endpoint, options = {}) {
    const url = getApiUrl(endpoint);
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
    
    // Obtener token del localStorage si existe (solo para endpoints que lo requieren)
    const token = localStorage.getItem('authToken');
    if (token && !endpoint.includes('/auth/')) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }
    
    const finalOptions = { ...defaultOptions, ...options };
    
    // Merge headers correctly
    if (options.headers) {
        finalOptions.headers = { ...defaultOptions.headers, ...options.headers };
    }
    
    console.log('🌐 Making API request:', {
        url,
        method: finalOptions.method || 'GET',
        headers: finalOptions.headers
    });
    
    try {
        const response = await fetch(url, finalOptions);
        
        console.log('📡 API Response:', {
            status: response.status,
            statusText: response.statusText,
            url: response.url
        });
        
        if (!response.ok) {
            let errorData = {};
            try {
                errorData = await response.json();
            } catch (e) {
                errorData = { message: `HTTP error! status: ${response.status}` };
            }
            
            console.error('❌ API Error:', errorData);
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('✅ API Success:', data);
            return data;
        } else {
            const text = await response.text();
            console.log('✅ API Success (text):', text);
            return text;
        }
    } catch (error) {
        console.error('🚨 API Request failed:', {
            url,
            error: error.message,
            stack: error.stack
        });
        throw error;
    }
}

// Funciones específicas para cada operación de la API
export const apiService = {
    // Autenticación
    auth: {
        login: async (email, password) => {
            return apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
        },
        
        register: async (userData) => {
            return apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
                method: 'POST',
                body: JSON.stringify(userData)
            });
        },
        
        validateToken: async () => {
            const token = localStorage.getItem('authToken');
            if (!token) throw new Error('No token found');
            
            return apiRequest(API_CONFIG.ENDPOINTS.AUTH.VALIDATE, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
    },
    
    // Productos
    products: {
        getAll: async () => {
            return apiRequest(API_CONFIG.ENDPOINTS.PRODUCTS.GET_ALL);
        },
        
        getById: async (id) => {
            return apiRequest(`${API_CONFIG.ENDPOINTS.PRODUCTS.GET_BY_ID}/${id}`);
        },
        
        create: async (productData) => {
            return apiRequest(API_CONFIG.ENDPOINTS.PRODUCTS.CREATE, {
                method: 'POST',
                body: JSON.stringify(productData)
            });
        },
        
        update: async (id, productData) => {
            return apiRequest(`${API_CONFIG.ENDPOINTS.PRODUCTS.UPDATE}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(productData)
            });
        },
        
        delete: async (id) => {
            return apiRequest(`${API_CONFIG.ENDPOINTS.PRODUCTS.DELETE}/${id}`, {
                method: 'DELETE'
            });
        }
    },
    
    // Usuarios
    users: {
        getAll: async () => {
            return apiRequest(API_CONFIG.ENDPOINTS.USERS.GET_ALL);
        },
        
        getById: async (id) => {
            return apiRequest(`${API_CONFIG.ENDPOINTS.USERS.GET_BY_ID}/${id}`);
        },
        
        update: async (id, userData) => {
            return apiRequest(`${API_CONFIG.ENDPOINTS.USERS.UPDATE}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(userData)
            });
        }
    }
};

// Inicializar configuración al cargar el módulo
detectEnvironment();