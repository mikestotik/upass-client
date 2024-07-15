import { Button, Form, message, Slider, Switch } from "antd";
import classNames from "classnames";
import { Formik } from "formik";
import * as passGenerator from 'generate-password-browser';
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import * as Yup from 'yup';

const formValidationSchema = Yup.object().shape({
	length: Yup.number().min(4).notRequired(),
	uppercase: Yup.boolean().notRequired(),
	lowercase: Yup.boolean().notRequired(),
	numbers: Yup.boolean().notRequired(),
	symbols: Yup.boolean().notRequired()
});

interface Generator {
	length: number;
	uppercase: boolean;
	lowercase: boolean;
	numbers: boolean;
	symbols: boolean;
}

interface PasswordGeneratorProps {
	onClose: (password: string) => void;
}

export const PasswordGenerator = observer(({ onClose }: PasswordGeneratorProps) => {
	const [ password, setPassword ] = useState('');
	const [ form ] = Form.useForm();

	const formInitialValues: Generator = {
		length: 16,
		uppercase: true,
		lowercase: true,
		numbers: true,
		symbols: false,
	};

	const onSubmit = useCallback(async (values: Generator) => {
		const generated = passGenerator.generate({
			...values,
			strict: true,
			exclude: '~`.,'
		});
		setPassword(generated);
	}, [ password ]);


	const isDisabled = (values: Generator) => {
		const disabled = [ values.uppercase, values.lowercase, values.numbers, values.symbols ]
			.filter(i => i).length === 1;

		if (!disabled) return false;

		if (values.uppercase) return 'uppercase';
		if (values.lowercase) return 'lowercase';
		if (values.numbers) return 'numbers';
		if (values.symbols) return 'symbols';
	}

	const onApply = useCallback(() => onClose(password), [ password ])

	return (
		<Formik initialValues={ formInitialValues } validationSchema={ formValidationSchema } onSubmit={ onSubmit } enableReinitialize>
			{ ({ values, handleSubmit, setFieldValue, isValid }) => (
				<Form form={ form } layout="vertical" onFinish={ handleSubmit }>
					<Form.Item label={ `Password Length: ${ values.length }` }>
						<Slider
							id="Length"
							onChange={ (value) => setFieldValue('length', value) }
							value={ values.length }
							min={ 4 }
							max={ 32 }
						/>
					</Form.Item>

					<Form.Item>
						<div className="pass-gen-switch">
							<i>A-Z</i>
							<label>Uppercase letters</label>
							<Switch
								id="uppercase"
								onChange={ (value) => setFieldValue('uppercase', value) }
								checked={ values.uppercase }
								disabled={ isDisabled(values) === 'uppercase' }
							/>
						</div>
					</Form.Item>

					<Form.Item>
						<div className="pass-gen-switch">
							<i>a-z</i>
							<label>Lowercase letters</label>
							<Switch
								id="lowercase"
								onChange={ (value) => setFieldValue('lowercase', value) }
								checked={ values.lowercase }
								disabled={ isDisabled(values) === 'lowercase' }
							/>
						</div>
					</Form.Item>

					<Form.Item>
						<div className="pass-gen-switch">
							<i>0-9</i>
							<label>Numbers</label>
							<Switch
								id="numbers"
								onChange={ (value) => setFieldValue('numbers', value) }
								checked={ values.numbers }
								disabled={ isDisabled(values) === 'numbers' }
							/>
						</div>
					</Form.Item>

					<Form.Item>
						<div className="pass-gen-switch">
							<i>!=&</i>
							<label>Symbols</label>
							<Switch
								id="symbols"
								onChange={ (value) => setFieldValue('symbols', value) }
								checked={ values.symbols }
								disabled={ isDisabled(values) === 'symbols' }
							/>
						</div>
					</Form.Item>

					<Form.Item label="Generated Password:">
						<div className="pass-generated">
							<div className={ classNames('pass-generated-value', { middle: password.length > 20 }, { small: password.length > 26 }) }>
								{ password.length ? password : '----' }
							</div>
							<div className="pass-generated-copy">
								<CopyToClipboard text={ password } onCopy={ () => message.info('Password is copied') }>
									<Button icon={ <i className="icon icon-clipboard" /> } type="link" disabled={ !password } />
								</CopyToClipboard>
							</div>
						</div>
					</Form.Item>

					<Form.Item>
						<div className="form-actions">
							<Button htmlType="submit">Generate</Button>
							<Button htmlType="button" onClick={ onApply } disabled={ !password.length }>Apply</Button>
						</div>
					</Form.Item>
				</Form>
			) }
		</Formik>
	)
});