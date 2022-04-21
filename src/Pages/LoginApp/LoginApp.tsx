import React, { FormEvent, useCallback, useState } from "react";
import { useFormik } from "formik";
import { Button, Form, HelpBlock, PageHeader } from "react-bootstrap";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Map } from "immutable";

import { getUsersDB } from "../../store/selectors/selectors";
import md5 from "../../utils/md5/md5";
import { typeActionUserPersonalData } from "../../store/typeAction/typeActionUserPersonalData";
import { yupSchemaLogin } from "../../utils/yupSchema/yupSchema";
import { FormGroupComponent } from "../../component/FormGroupComponent/FormGroupComponent";

import "./LoginApp.scss";

const initialValuesLogin: { [key: string]: string } = {
  email: "",
  password: "",
};

const paramsFormGroupsLogin: { [key: string]: string }[] = [
  {
    type: "email",
    name: "email",
    label: "Email",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
  },
];

type blurOnFormControlsType = Map<string, boolean>;

function LoginApp(): JSX.Element {
  const dispatch = useDispatch();
  const listUsers = useSelector(getUsersDB);
  const [isFormSubmitError, setIsFormSubmitError] = useState<boolean>(false);
  const [blurOnFormControls, setBlurOnFormControls] = useState<blurOnFormControlsType>(
    Map({
      email: true,
      password: true,
    })
  );
  const [isAuthError, setIsAuthError] = useState(false);

  const loginUser = useCallback(
    ({ password, email }): void => {
      const indexUser = listUsers.findIndex(
        (user) => user.get("email") === email && user.get("password") === md5(password)
      );
      if (indexUser >= 0) {
        dispatch({
          type: typeActionUserPersonalData.SetUserData,
          payload: listUsers.get(indexUser),
        });
      } else {
        setIsFormSubmitError(true);
        setIsAuthError(true);
      }
    },
    [listUsers, dispatch]
  );

  const formik = useFormik({
    initialValues: initialValuesLogin,
    onSubmit: (values: { [key: string]: string }) => loginUser(values),
    validationSchema: Yup.object(yupSchemaLogin),
  });

  const submitForm = useCallback(
    (e: FormEvent<Form>) => {
      e.preventDefault();
      formik.isValid && formik.dirty ? formik.handleSubmit() : setIsFormSubmitError(true);
    },
    [formik]
  );

  const moveToRegister = useCallback(() => {
    dispatch(push("/register"));
  }, [dispatch]);

  return (
    <div className="container__app container__column container">
      <div className="container col-xs-8 login__form">
        <PageHeader>Login</PageHeader>
        <Form onSubmit={submitForm}>
          {paramsFormGroupsLogin.map((inputObjParams) => (
            <React.Fragment key={inputObjParams.name}>
              <FormGroupComponent
                inputObjParams={inputObjParams}
                blurOnFormControls={blurOnFormControls}
                setBlurOnFormControls={setBlurOnFormControls}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                isFormSubmitError={isFormSubmitError}
                setIsFormSubmitError={setIsFormSubmitError}
                touched={formik.touched[inputObjParams.name]}
                error={formik.errors[inputObjParams.name]}
                value={formik.values[inputObjParams.name]}
                isAuthError={isAuthError}
                setIsAuthError={setIsAuthError}
              />
            </React.Fragment>
          ))}

          {isAuthError && <HelpBlock>Invalid email or password. Try again</HelpBlock>}

          <Button type={"submit"}>Submit</Button>
        </Form>
        <div className="login__footer">
          <p>Already have an account?</p>
          <Button bsStyle="link" onClick={moveToRegister}>
            Register
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(LoginApp);
