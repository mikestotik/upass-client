import { useField, useFormikContext } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useRef, useState } from 'react';

interface InputCodeProps {
  name: string;
}

export const InputCode = observer(({ name }: InputCodeProps) => {
  const { setFieldValue, setFieldError, setTouched, errors, touched } = useFormikContext<{ code: string }>();

  const [_, __, helpers] = useField(name);
  const [code, setCode] = useState(new Array(6).fill(''));

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    helpers.setValue(code.join(''));
  }, [code, helpers]);

  const processPaste = useCallback(
    async (paste: string) => {
      const pasteCode = paste.slice(0, 6).split('');
      setCode(pasteCode);

      await setFieldValue(name, pasteCode.join(''));

      pasteCode.forEach((value, index) => {
        if (inputsRef.current[index]) inputsRef.current[index]!.value = value;
      });
      inputsRef.current[5]?.focus();
    },
    [name, setFieldValue],
  );

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;

    setCode((prevCode) => prevCode.map((digit, idx) => (idx === index ? value : digit)));

    if (index < 5 && value) {
      inputsRef.current[index + 1]?.focus();
    }
    await setFieldValue(name, code.join(''));
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const onInputPaste = useCallback(
    async (event: React.ClipboardEvent<HTMLInputElement>) => {
      await processPaste(event.clipboardData.getData('text'));
    },
    [processPaste],
  );

  return (
    <div className="input-code-box">
      <div className="input-code-container">
        <div className="input-code">
          {code.map((digit, index) => (
            <input
              key={index}
              className="input-code-cell"
              type="text"
              ref={(ref) => (inputsRef.current[index] = ref)}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyUp={(e) => handleKeyUp(e, index)}
              onPaste={onInputPaste}
            />
          ))}
        </div>
      </div>
    </div>
  );
});
