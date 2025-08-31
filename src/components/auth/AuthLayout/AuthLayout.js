import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AuthFooter from '../AuthFooter/AuthFooter';
import logo from '../../../assets/images/tuapa-acu.png';
import './AuthLayout.css';

const AuthLayout = ({ 
  children, 
  title, 
  subtitle, 
  infoTitle, 
  infoDescription, 
  benefits = [],
  showLogo = true 
}) => {
  return (
    <div className="auth-page">
      <Container fluid>
        <Row className="min-vh-100">
          {/* Lado esquerdo: informações */}
          <Col lg={6} className="auth-info-side d-none d-lg-flex">
            <div className="auth-info-content">
              {showLogo && (
                <div className="logo-container mb-4">
                  <img 
                    src={logo}
                    alt="TUPÃ-AÇU" 
                    className="logo-img"
                    onError={e => {
                      e.target.style.display = 'none';
                      // Fallback para texto se a imagem não carregar
                      const logoText = document.createElement('h1');
                      logoText.className = 'logo-text-fallback';
                      logoText.textContent = 'TUPÃ-AÇU';
                      e.target.parentNode.appendChild(logoText);
                    }}
                  />
                  <h1 className="logo-text">TUPÃ-AÇU</h1>
                </div>
              )}
              
              <h2 className="info-title">{infoTitle}</h2>
              
              {infoDescription && (
                <p className="info-description">{infoDescription}</p>
              )}
              
              {benefits.length > 0 && (
                <ul className="benefits-list">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="benefit-item">
                      <i className="fas fa-check-circle"></i>
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Col>
          
          {/* Lado direito: formulário */}
          <Col lg={6} className="auth-form-side">
            <div className="auth-form-container">
              <Card className="auth-card">
                <Card.Body className="p-5">
                  <div className="text-center mb-4">
                    <h3 className="auth-title">{title}</h3>
                    {subtitle && (
                      <p className="auth-subtitle text-muted">{subtitle}</p>
                    )}
                  </div>
                  {children}
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
      
      <AuthFooter />
    </div>
  );
};

export default AuthLayout;