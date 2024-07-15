import { Button, Form, message } from 'antd';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { RoutePaths } from '../../../const/routes.const.ts';
import { useStore } from '../../../hooks/useStore.hook.ts';
import { ApiError } from '../../../interfaces/api.interface.ts';
import { SignUpConfirmationPayload } from '../../../models/auth/auth.interfaces.ts';
import { InputCode } from '../../shared/form/InputCode.tsx';
import { AuthPage } from '../components/AuthPage.tsx';

const formValidationSchema = Yup.object().shape({
  code: Yup.string()
    .label('Code')
    .matches(/^[0-9]{6}$/, 'Enter a valid code')
    .required(),
});

export const AuthSignUpConfirmation = observer(() => {
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();

  const { accountStore } = useStore();

  const navigate = useNavigate();
  const email = searchParams.get('email');

  if (!email) {
    return <Navigate to={RoutePaths.AUTH_SIGN_IN} />;
  }

  const formInitialValues: SignUpConfirmationPayload = { email, code: null };

  const handleSubmitError = useCallback(async (e: AxiosError) => {
    message.error((e.response?.data as ApiError).message);
  }, []);

  const onSubmit = useCallback(
    async (values: SignUpConfirmationPayload, { setSubmitting }: FormikHelpers<SignUpConfirmationPayload>) => {
      try {
        await accountStore.activate({
          ...values,
          code: Number(values.code),
        });
        message.success('Account activated successfully!');
        navigate(RoutePaths.MAIN);
      } catch (e) {
        await handleSubmitError(e as AxiosError);
      }
      setSubmitting(false);
    },
    [accountStore, handleSubmitError, navigate],
  );

  return (
    <AuthPage desc={`To activate your account, enter the 6-digit code that was sent to your email ${email}`}>
      <Formik initialValues={formInitialValues} validationSchema={formValidationSchema} onSubmit={onSubmit}>
        {({ handleSubmit, isSubmitting, isValid }) => (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item>
              <InputCode name="code" />
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                htmlType="submit"
                type={isSubmitting ? 'default' : 'primary'}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
                block
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </AuthPage>
  );
});
