
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error al cargar productos:', err);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    if (!searchTerm.trim()) {
      fetchProducts();
      return;
    }
    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/products/search?query=${searchTerm}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error al buscar productos:', err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!day || !month || !year) {
      setError('Please enter day, month, and year.');
      return;
    }
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/days-to-expire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day, month, year })
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.daysToExpire);
      } else {
        setError(data.error || 'Error calculating days to expire');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const getExpirationColor = (days) => {
    if (days < 0) return '#ff4444'; // Expirado - rojo
    if (days <= 3) return '#ff8800'; // Próximo a expirar - naranja
    if (days <= 7) return '#ffbb00'; // Advertencia - amarillo
    return '#44ff44'; // Seguro - verde
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Gestión de Productos</h1>
      </header>

      <div className="container">
        {/* Calculadora de días */}
        <div className="calculator-section">
          <h2>Calculadora de Días de Expiración</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              placeholder="Día"
              value={day}
              onChange={e => setDay(e.target.value)}
              min="1"
              max="31"
            />
            <input
              type="number"
              placeholder="Mes"
              value={month}
              onChange={e => setMonth(e.target.value)}
              min="1"
              max="12"
            />
            <input
              type="number"
              placeholder="Año"
              value={year}
              onChange={e => setYear(e.target.value)}
              min="2024"
            />
            <button type="submit">Calcular</button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {result !== null && (
            <div className="result">
              <p>Días para vender el producto: <strong>{result}</strong></p>
            </div>
          )}
        </div>

        {/* Lista de productos */}
        <div className="products-section">
          <h2>Inventario de Productos</h2>
          
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit">Buscar</button>
            <button type="button" onClick={() => { setSearchTerm(''); fetchProducts(); }}>
              Todos
            </button>
          </form>

          {!hasSearched ? (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
              Usa el buscador para encontrar productos
            </p>
          ) : loading ? (
            <p>Cargando productos...</p>
          ) : (
            <div className="products-grid">
              {products.length === 0 ? (
                <p>No se encontraron productos con ese nombre.</p>
              ) : (
                products.map(product => (
                  <div key={product._id} className="product-card">
                    <h3>{product.name}</h3>
                    <p className="description">{product.description}</p>
                    <div className="product-info">
                      <span className="category">{product.category}</span>
                      <span className="price">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="stock">Stock: {product.stock} unidades</div>
                    <div className="expiration">
                      <strong>Fecha de expiración:</strong>
                      <br />
                      {new Date(product.expirationDate).toLocaleDateString('es-ES')}
                    </div>
                    <div 
                      className="days-to-expire"
                      style={{ backgroundColor: getExpirationColor(product.daysToExpire) }}
                    >
                      {product.daysToExpire < 0 
                        ? `¡EXPIRADO! (${Math.abs(product.daysToExpire)} días)`
                        : product.daysToExpire === 0
                        ? '¡Expira HOY!'
                        : `${product.daysToExpire} días restantes`
                      }
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
