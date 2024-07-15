import { Button, Form, Input, message } from 'antd';
import useModal from 'antd/lib/modal/useModal';
import { AxiosError } from 'axios';
import { Formik, FormikHelpers } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { RoutePaths } from '../../const/routes.const.ts';
import { useStore } from '../../hooks/useStore.hook.ts';
import { ApiError } from '../../interfaces/api.interface.ts';
import { CreatePasswordPayload } from '../../models/login/login.interface.ts';
import { InputError } from '../shared/form/InputError.tsx';
import { ItemDetailsLogo } from '../shared/ItemDetailsLogo.tsx';
import { Loader } from '../shared/Loader.tsx';
import { PasswordGenerator } from '../shared/PasswordGenerator.tsx';

const formValidationSchema = Yup.object().shape({
	title: Yup.string().label('Title').required(),
	username: Yup.string().label('Username').required(),
	password: Yup.string().label('Password').required(),
	url: Yup.string().label('Url').notRequired(),
	totp: Yup.string().label('TOTP').notRequired(),
	notes: Yup.string().label('Notes').notRequired(),
});

export const LoginDetails = observer(() => {
	const [ loading, setLoading ] = useState<boolean>(false);
	const [ form ] = Form.useForm();
	const [ passwordVisible, setPasswordVisible ] = useState(false);
	const [ modal, contextHolder ] = useModal();

	const { loginStore } = useStore();
	const { id } = useParams();

	const item = loginStore.selectById(Number(id));
	const navigate = useNavigate();

	const formInitialValues: CreatePasswordPayload = {
		title: item?.title ?? '',
		username: item?.username ?? '',
		password: item?.password ?? '',
		url: item?.url ?? '',
		totp: item?.totp ?? '',
		notes: item?.notes ?? '',
	};

	const handleResponseError = useCallback(async (e: AxiosError) => {
		message.error((e.response?.data as ApiError).message);
	}, []);

	const onSubmit = useCallback(
		async (values: CreatePasswordPayload, { setSubmitting }: FormikHelpers<CreatePasswordPayload>) => {
			try {
				if (item) {
					const saved = await loginStore.update(item.id, values);
					message.success(`Login: ${ saved.title } updated`);
				} else {
					const saved = await loginStore.create(values);
					message.success(`Login: ${ saved.title } saved`);
					navigate(RoutePaths.LOGIN_DETAILS.replace(':id', String(saved.id)));
				}
			} catch (e) {
				await handleResponseError(e as AxiosError);
			}
			setSubmitting(false);
		},

		[ item, handleResponseError ]
	);

	const onDelete = useCallback(async () => {
		try {
			if (item) {
				await loginStore.delete(item.id);
				message.success(`Login: ${ item.title } deleted`);
				navigate(RoutePaths.LOGIN);
			}
		} catch (e) {
			await handleResponseError(e as AxiosError);
		}
	}, [ item ]);

	const onFavorite = useCallback(async () => {
		try {
			const saved = await loginStore.update(item!.id, {
				favorite: !item!.favorite,
			});
			if (saved.favorite) {
				message.success(`Login: ${ saved.title } added to favorite`);
			} else {
				message.success(`Login: ${ saved.title } removed from favorite`);
			}
		} catch (e) {
			await handleResponseError(e as AxiosError);
		}
	}, [ item ]);

	const onPasswordVisible = useCallback(
		(event: React.MouseEvent) => {
			event.stopPropagation();
			setPasswordVisible(!passwordVisible);
		},
		[ passwordVisible ],
	);

	const onPasswordGenerate = (event: React.MouseEvent, setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void) => {
		event.stopPropagation();

		const onDestroy = (password: string) => {
			destroy();
			setFieldValue('password', password);
		}
		const { destroy } = modal.info({
			title: 'Generate random password',
			content: <PasswordGenerator onClose={ onDestroy } />,
			closable: true,
			maskClosable: true,
			icon: null,
			footer: null
		});
	}


	return loading ? (
		<Loader />
	) : (
		<>
			<Formik initialValues={ formInitialValues } validationSchema={ formValidationSchema } onSubmit={ onSubmit } enableReinitialize>
				{ ({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, isSubmitting, isValid }) => (
					<Form form={ form } layout="vertical" onFinish={ handleSubmit }>
						<div className="details">
							<div className="details-controls">
								<Button
									key="save"
									icon={ <i className="icon icon-save" /> }
									htmlType="submit"
									disabled={ !isValid || isSubmitting }
									loading={ isSubmitting }
								>
									Save
								</Button>

								{ item && (
									<Button key="delete" icon={ <i className="icon icon-trash" /> } onClick={ onDelete }>
										Delete
									</Button>
								) }
							</div>

							<div className="details-info">
								<div className="details-info-logo">
									<ItemDetailsLogo title={ values.title || 'New' } type="Login" />
								</div>

								<div className="details-info-actions">
									{ item && <Button icon={ <i className="icon icon-star" /> } type={ item.favorite ? 'primary' : 'text' } onClick={ onFavorite } /> }
								</div>
							</div>

							<div className="details-form">
								<Form.Item label="Title" className="details-control-item">
									<Input
										name="title"
										status={ errors.title && touched.title ? 'error' : '' }
										placeholder="Type title"
										autoComplete="on"
										onChange={ handleChange }
										onBlur={ handleBlur }
										value={ values.title }
										variant="borderless"
									/>
									<InputError name="title" />
								</Form.Item>

								<Form.Item label="Username" className="details-control-item">
									<Input
										name="username"
										status={ errors.username && touched.username ? 'error' : '' }
										placeholder="Type username"
										autoComplete="chrome-off"
										onChange={ handleChange }
										onBlur={ handleBlur }
										value={ values.username }
										variant="borderless"
										suffix={
											<div className="input-suffix">
												<CopyToClipboard text={ values.username } onCopy={ () => message.info('Username is copied') }>
													<Button icon={ <i className="icon icon-clipboard" /> } type="text" size="small" disabled={ !values.username } />
												</CopyToClipboard>
											</div>
										}
									/>
									<InputError name="username" />
								</Form.Item>

								<Form.Item label="Password" className="details-control-item">
									<Input
										type={ passwordVisible ? 'text' : 'password' }
										name="password"
										status={ errors.password && touched.password ? 'error' : '' }
										placeholder="Enter your Password"
										autoComplete="chrome-off"
										onChange={ handleChange }
										onBlur={ handleBlur }
										value={ values.password }
										variant="borderless"
										suffix={
											<div className="input-suffix">
												<Button onClick={ (event) => onPasswordGenerate(event, setFieldValue) } icon={ <i className="icon icon-reload" /> } type="text" size="small" />
												<Button
													onClick={ onPasswordVisible }
													icon={ passwordVisible ? <i className="icon icon-eye" /> : <i className="icon icon-eye-blocked" /> }
													type="text"
													size="small"
												/>
												<CopyToClipboard text={ values.password } onCopy={ () => message.info('Password is copied') }>
													<Button icon={ <i className="icon icon-clipboard" /> } type="text" size="small" disabled={ !values.password } />
												</CopyToClipboard>
											</div>
										}
									/>
									<InputError name="password" />
								</Form.Item>

								<Form.Item label="Url" className="details-control-item">
									<Input
										name="url"
										status={ errors.url && touched.url ? 'error' : '' }
										placeholder="Type url"
										autoComplete="off"
										onChange={ handleChange }
										onBlur={ handleBlur }
										value={ values.url }
										variant="borderless"
									/>
									<InputError name="url" />
								</Form.Item>

								<Form.Item label="Authenticator key (TOTP)" className="details-control-item">
									<Input
										name="totp"
										status={ errors.totp && touched.totp ? 'error' : '' }
										placeholder="Type key"
										autoComplete="off"
										onChange={ handleChange }
										onBlur={ handleBlur }
										value={ values.totp }
										variant="borderless"
										suffix={
											<div className="input-suffix">
												<CopyToClipboard text={ values.totp ?? '' } onCopy={ () => message.info('TOTP is copied') }>
													<Button icon={ <i className="icon icon-clipboard" /> } type="text" size="small" disabled={ !values.totp } />
												</CopyToClipboard>
											</div>
										}
									/>
									<InputError name="totp" />
								</Form.Item>
							</div>

							<div className="details-notes">
								<Form.Item label="Notes" className="details-control-item">
									<Input.TextArea
										name="notes"
										placeholder="Type note"
										autoComplete="on"
										onChange={ handleChange }
										onBlur={ handleBlur }
										value={ values.notes }
										variant="borderless"
										rows={ 8 }
									/>
								</Form.Item>
							</div>
						</div>
					</Form>
				) }
			</Formik>

			{ contextHolder }
		</>
	);
});
