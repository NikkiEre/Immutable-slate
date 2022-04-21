import React, { ChangeEvent, SyntheticEvent, useCallback, useMemo, useState } from "react";
import { ControlLabel, FormControl, FormControlProps, FormGroup, HelpBlock } from "react-bootstrap";
import { Map } from "immutable";

type blurOnFormControlsType = Map<string, boolean>;

interface FormGroupComponentProps {
  inputObjParams: { [key: string]: string };
  isFormSubmitError: boolean;
  blurOnFormControls: blurOnFormControlsType;
  handleBlur: (e: SyntheticEvent<FormControlProps>) => void;
  handleChange: (e: ChangeEvent<FormControlProps>) => void;
  setBlurOnFormControls: (value: blurOnFormControlsType) => void;
  setIsFormSubmitError: (bool: boolean) => void;
  isErrorDuplicate?: boolean;
  touched?: boolean;
  error?: string;
  value?: string;
  setIsErrorDuplicate?: (bool: boolean) => void;
  isAuthError?: boolean;
  setIsAuthError?: (bool: boolean) => void;
}

export const FormGroupComponent = React.memo(
  ({
    inputObjParams,
    blurOnFormControls,
    handleBlur,
    handleChange,
    setBlurOnFormControls,
    setIsFormSubmitError,
    setIsErrorDuplicate,
    isFormSubmitError,
    isErrorDuplicate,
    touched,
    error,
    value,
    isAuthError,
    setIsAuthError,
  }: FormGroupComponentProps) => {
    const [dirty, setDirty] = useState(false);

    const dirtyError = useMemo(
      () => blurOnFormControls.get(inputObjParams.name) && dirty && error,
      [dirty, blurOnFormControls, error, inputObjParams]
    );

    const submitError = useMemo(
      () => isFormSubmitError && (!touched || error),
      [isFormSubmitError, touched, error]
    );

    const duplicateError = useMemo(
      () => isErrorDuplicate && inputObjParams.name === "email",
      [isErrorDuplicate, inputObjParams]
    );

    const formGroupBlur = useCallback(
      (e: SyntheticEvent<FormControlProps>) => {
        setBlurOnFormControls(blurOnFormControls.set(inputObjParams.name, true));
        handleBlur(e);
      },
      [inputObjParams, blurOnFormControls, handleBlur, setBlurOnFormControls]
    );

    const formGroupChange = useCallback(
      (e: ChangeEvent<FormControlProps>): void => {
        !dirty && setDirty(true);
        setIsFormSubmitError(false);
        setIsErrorDuplicate && setIsErrorDuplicate(false);
        setBlurOnFormControls(blurOnFormControls.set(inputObjParams.name, false));
        setIsAuthError && setIsAuthError(false);
        handleChange(e);
      },
      [
        dirty,
        blurOnFormControls,
        inputObjParams,
        handleChange,
        setBlurOnFormControls,
        setIsAuthError,
        setIsErrorDuplicate,
        setIsFormSubmitError,
      ]
    );

    return (
      <FormGroup
        validationState={
          dirtyError || submitError || duplicateError || isAuthError ? "error" : null
        }
      >
        <ControlLabel>{inputObjParams.label}</ControlLabel>
        <FormControl
          type={inputObjParams.type}
          placeholder={inputObjParams.label}
          name={inputObjParams.name}
          value={value}
          onChange={formGroupChange}
          onBlur={formGroupBlur}
          autoComplete={"off"}
        />

        {dirtyError && <HelpBlock>{error}</HelpBlock>}

        {submitError && !value?.trim().length && !dirty && (
          <HelpBlock>This field is required.</HelpBlock>
        )}

        {duplicateError && (
          <HelpBlock>
            The user with this email is already registered. Please enter a different email.
          </HelpBlock>
        )}
      </FormGroup>
    );
  }
);
