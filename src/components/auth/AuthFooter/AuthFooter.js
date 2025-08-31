import React from 'react';
import './AuthFooter.css';

const AuthFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="auth-footer">
      <div className="auth-footer-content">
        {/* <div className="footer-left">
          <span className="copyright">
            © {currentYear} SEDUC/MA - Secretaria de Estado da Educação do Maranhão
          </span>
        </div> */}
        <div className="footer-right">
          <span className="version-info">
            TUPÃ-AÇU v1.0.0 | Sistema de Recepção
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthFooter;