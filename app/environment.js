// Configuración específica para diferentes entornos
export const ENVIRONMENT_CONFIG = {
    development: {
        API_BASE_URL: 'http://localhost:8080',
        DEBUG: true,
        USE_FALLBACK: true
    },
    
    production: {
        API_BASE_URL: 'https://8mq33rknsp.us-east-1.awsapprunner.com', // Backend en AWS App Runner
        DEBUG: false,
        USE_FALLBACK: false
    },
    
    staging: {
        API_BASE_URL: 'https://staging-backend.herokuapp.com',
        DEBUG: true,
        USE_FALLBACK: true
    }
};

// Función para detectar el entorno actual
export function getCurrentEnvironment() {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'development';
    } else if (hostname.includes('amplifyapp.com')) {
        return 'production';
    } else {
        return 'staging';
    }
}

// Función para obtener la configuración del entorno actual
export function getEnvironmentConfig() {
    const env = getCurrentEnvironment();
    return ENVIRONMENT_CONFIG[env];
}

// Log de configuración para debugging
console.log('🌍 Environment detected:', getCurrentEnvironment());
console.log('⚙️ Config loaded:', getEnvironmentConfig());