import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { authService } from '../../../services/api/authService';
import AuthLayout from '../AuthLayout/AuthLayout';
import Loading from '../../common/Loading/Loading';

// Schema de validação
const forgotSchema = yup.object({
  email: yup.string().email('Digite um email válido').required('Email é obrigatório')
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm({
    resolver: yupResolver(forgotSchema),
    defaultValues: { email: '' }
  });

  React.useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      // Chamada para API de recuperação de senha
      const result = await authService.forgotPassword(data.email);
      if (result.success) {
        setSuccessMsg('Enviamos um link de redefinição de senha para seu email. Verifique sua caixa de entrada (e spam).');
        toast.success('Email enviado com sucesso!');
        reset();
      } else {
        setErrorMsg(result.error || 'Erro ao enviar email. Tente novamente.');
        toast.error(result.error || 'Erro ao enviar email.');
      }
    } catch (err) {
      setErrorMsg('Erro inesperado. Tente novamente.');
      toast.error('Erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <>
      <div className="text-center mb-4">
        <h3 className="auth-title">Recuperar Senha</h3>
        <p className="auth-subtitle text-muted">
          Informe seu email para receber o link de redefinição
        </p>
      </div>
      {successMsg && (
        <Alert variant="success" className="mb-3">{successMsg}</Alert>
      )}
      {errorMsg && (
        <Alert variant="danger" className="mb-3">{errorMsg}</Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form.Group className="mb-4">
          <Form.Label>Email</Form.Label>
          <InputGroup>
            <InputGroup.Text>
              <i className="fas fa-envelope"></i>
            </InputGroup.Text>
            <Form.Control
              type="email"
              placeholder="Digite seu email cadastrado"
              {...register('email')}
              isInvalid={!!errors.email}
              autoComplete="email"
            />
          </InputGroup>
          {errors.email && (
            <Form.Control.Feedback type="invalid">
              {errors.email.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-100 auth-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                className="me-2"
              />
              Enviando...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane me-2"></i>
              Enviar link de recuperação
            </>
          )}
        </Button>
      </Form>
      <div className="text-center mt-4">
        <Link 
          to="/login" 
          className="text-decoration-none fw-bold auth-link"
        >
          <i className="fas fa-arrow-left me-2"></i>
          Voltar para Login
        </Link>
      </div>
    </>
  );

  return (
    <AuthLayout 
      title="Recuperação de senha"
      subtitle="Esqueceu sua senha? Não se preocupe, vamos ajudá-lo a recuperar o acesso."
    >
      {formContent}
    </AuthLayout>
  );
};

export default ForgotPassword;