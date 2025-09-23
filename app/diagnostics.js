// Script de testing para verificar la conexión backend-frontend
import { API_CONFIG, getApiUrl, apiRequest } from './api-config.js';

// Función para probar la conectividad del backend
export async function testBackendConnection() {
    console.log('🔍 Testing backend connection...');
    console.log('🌐 Backend URL:', API_CONFIG.BASE_URL);
    
    const tests = [
        {
            name: 'Health Check',
            endpoint: '/health',
            method: 'GET'
        },
        {
            name: 'Products Endpoint',
            endpoint: '/rutamtb/products',
            method: 'GET'
        },
        {
            name: 'Auth Endpoint (should be accessible)',
            endpoint: '/rutamtb/auth/validate',
            method: 'POST',
            expectError: true // Este endpoint debería dar error sin token
        }
    ];
    
    const results = [];
    
    for (const test of tests) {
        console.log(`\n🧪 Testing: ${test.name}`);
        try {
            const response = await fetch(getApiUrl(test.endpoint), {
                method: test.method,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                mode: 'cors'
            });
            
            console.log(`📊 Status: ${response.status} ${response.statusText}`);
            console.log(`🔗 URL: ${response.url}`);
            
            if (test.expectError) {
                results.push({
                    test: test.name,
                    status: 'PASS',
                    message: `Expected error received: ${response.status}`
                });
            } else if (response.ok) {
                results.push({
                    test: test.name,
                    status: 'PASS',
                    message: `Success: ${response.status}`
                });
            } else {
                results.push({
                    test: test.name,
                    status: 'FAIL',
                    message: `HTTP ${response.status}: ${response.statusText}`
                });
            }
            
        } catch (error) {
            console.error(`❌ Error in ${test.name}:`, error);
            results.push({
                test: test.name,
                status: 'ERROR',
                message: error.message
            });
        }
    }
    
    console.log('\n📋 Test Results Summary:');
    console.table(results);
    
    return results;
}

// Función para probar CORS específicamente
export async function testCORS() {
    console.log('🔍 Testing CORS configuration...');
    
    try {
        const response = await fetch(getApiUrl('/rutamtb/products'), {
            method: 'OPTIONS',
            headers: {
                'Origin': window.location.origin,
                'Access-Control-Request-Method': 'GET',
                'Access-Control-Request-Headers': 'Content-Type'
            }
        });
        
        console.log('CORS preflight response:', {
            status: response.status,
            headers: {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
                'Access-Control-Allow-Credentials': response.headers.get('Access-Control-Allow-Credentials')
            }
        });
        
        return response.ok;
    } catch (error) {
        console.error('CORS test failed:', error);
        return false;
    }
}

// Función para probar autenticación
export async function testAuthentication() {
    console.log('🔍 Testing authentication endpoints...');
    
    try {
        // Probar endpoint de login con datos inválidos (debería dar 401, no 403)
        const response = await fetch(getApiUrl('/rutamtb/auth/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: 'test@test.com',
                password: 'invalid'
            })
        });
        
        console.log(`Auth test - Status: ${response.status}`);
        
        if (response.status === 401) {
            console.log('✅ Auth endpoint is accessible (returns 401 for invalid credentials)');
            return true;
        } else if (response.status === 403) {
            console.log('❌ Auth endpoint is blocked (CORS or security issue)');
            return false;
        } else {
            console.log(`⚠️ Unexpected status: ${response.status}`);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Auth test failed:', error);
        return false;
    }
}

// Función principal de diagnóstico
export async function runDiagnostics() {
    console.log('🚀 Starting backend connection diagnostics...');
    console.log('⏰ Current time:', new Date().toISOString());
    console.log('🌐 Frontend URL:', window.location.origin);
    console.log('🔗 Backend URL:', API_CONFIG.BASE_URL);
    
    const results = {
        connectionTest: await testBackendConnection(),
        corsTest: await testCORS(),
        authTest: await testAuthentication()
    };
    
    console.log('\n📊 Full Diagnostic Results:');
    console.log(results);
    
    return results;
}

// Hacer disponible globalmente para testing en consola
window.runDiagnostics = runDiagnostics;
window.testBackendConnection = testBackendConnection;
window.testCORS = testCORS;
window.testAuthentication = testAuthentication;

console.log('🛠️ Diagnostic tools loaded. Run window.runDiagnostics() in console to test connection.');