import { Button, Form, Input, message } from 'antd';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Message } from '../../../const/messages.const.ts';
import { RoutePaths } from '../../../const/routes.const.ts';
import { Validation } from '../../../const/validation.const.ts';
import { useStore } from '../../../hooks/useStore.hook.ts';
import { ApiError } from '../../../interfaces/api.interface.ts';
import { SignInPayload } from '../../../models/auth/auth.interfaces.ts';
import { InputError } from '../../shared/form/InputError.tsx';
import { AuthPage } from '../components/AuthPage.tsx';

const formValidationSchema = Yup.object().shape({
  email: Yup.string().label('Email').email('Incorrect email format').required(),
  password: Yup.string().label('Password').matches(Validation.regExpPassword, { message: Message.passwordValidation }).required(),
});

export const AuthSignIn = observer(() => {
  const { authStore } = useStore();

  const [ form ] = Form.useForm();

  const navigate = useNavigate();

  const formInitialValues: SignInPayload = {
    email: '',
    password: '',
  };

  const handleSubmitError = useCallback(async (e: AxiosError) => {
    message.error((e.response?.data as ApiError).message);
  }, []);

  const onSubmit = useCallback(
    async (values: SignInPayload, { setSubmitting }: FormikHelpers<SignInPayload>) => {
      try {
        await authStore.signIn(values);

        navigate(RoutePaths.MAIN);
      } catch (e) {
        await handleSubmitError(e as AxiosError);
      }
      setSubmitting(false);
    },
    [ authStore, handleSubmitError, navigate ],
  );

  const onForgotPassword = useCallback(async () => {
    navigate(RoutePaths.AUTH_CHANGE_PASSWORD);
  }, [ navigate ]);

  return (
    <AuthPage desc="Welcome back! Please login to your account">
      <Formik initialValues={ formInitialValues } validationSchema={ formValidationSchema } onSubmit={ onSubmit }>
        { ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, isValid }) => (
          <Form form={ form } layout="vertical" onFinish={ handleSubmit }>
            <Form.Item label="Email">
              <Input
                size="large"
                type="email"
                name="email"
                status={ errors.email && touched.email ? 'error' : '' }
                placeholder="username@domain.com"
                autoComplete="on"
                onChange={ handleChange }
                onBlur={ handleBlur }
                value={ values.email }
                prefix={ <i className="icon icon-email" /> }
              />
              <InputError name="email" />
            </Form.Item>

            <Form.Item label="Password">
              <Input
                size="large"
                type="password"
                name="password"
                status={ errors.password && touched.password ? 'error' : '' }
                placeholder="Enter your Password"
                autoComplete="on"
                onChange={ handleChange }
                onBlur={ handleBlur }
                value={ values.password }
                prefix={ <i className="icon icon-lock" /> }
              />
              <InputError name="password" />
            </Form.Item>

            <Form.Item>
              <Button 
              className="auth-pass-navigate" 
              type="link" 
              onClick={ onForgotPassword }
              >
                Forgot Password?
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                htmlType="submit"
                type={ isSubmitting ? 'default' : 'primary' }
                disabled={ !isValid || isSubmitting }
                loading={ isSubmitting }
                block
              >
                Sign In
              </Button>
            </Form.Item>

            <div className="auth-back">
              <NavLink to={ RoutePaths.AUTH_SIGN_UP }>Dont have an account?</NavLink>
            </div>
          </Form>
        ) }
      </Formik>
    </AuthPage>
  );
});
