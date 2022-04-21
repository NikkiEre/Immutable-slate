import React, { FormEvent, useCallback, useState } from "react";
import { useFormik } from "formik";
import { Button, Form, PageHeader } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toastr } from "react-redux-toastr";
import { push } from "connected-react-router";
import * as Yup from "yup";
import { Map } from "immutable";

import { getUsersDB } from "../../store/selectors/selectors";
import { typeActionUserDB } from "../../store/typeAction/typeActionUserDB";
import { yupSchemaRegister } from "../../utils/yupSchema/yupSchema";
import { FormGroupComponent } from "../../component/FormGroupComponent/FormGroupComponent";
import { UserDataState } from "../../store/interfaces/interfacesRedux";

import "./RegisterApp.scss";

const initialValuesRegister: { [key: string]: string } = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const paramsFormGroupsRegister: { [key: string]: string }[] = [
  {
    type: "email",
    name: "email",
    label: "Email",
  },
  {
    type: "text",
    name: "username",
    label: "Username",
  },
  {
    type: "password",
    name: "password",
    label: "Password",
  },
  {
    type: "password",
    name: "confirmPassword",
    label: "Confirm Password",
  },
];

type blurOnFormControlsType = Map<string, boolean>;

function RegisterApp(): JSX.Element {
  const dispatch = useDispatch();
  const listUsers = useSelector(getUsersDB);
  const [isErrorDuplicate, setIsErrorDuplicate] = useState<boolean>(false);
  const [blurOnFormControls, setBlurOnFormControls] = useState<blurOnFormControlsType>(
    Map({
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
    })
  );
  const [isFormSubmitError, setIsFormSubmitError] = useState(false);

  const RegisterUser = useCallback(
    ({ username, email, password }) => {
      const indexUser = listUsers.findIndex((user: UserDataState) => user.get("email") === email);
      if (indexUser >= 0) {
        setIsErrorDuplicate(true);
      } else {
        dispatch({
          type: typeActionUserDB.Create,
          payload: { username, password, email },
        });
        toastr.success(
          "Success",
          "You have successfully registered. Can enter your details and log in."
        );
        dispatch(push("/login"));
      }
    },
    [listUsers, dispatch]
  );

  const formik = useFormik({
    initialValues: initialValuesRegister,
    onSubmit: (values: { [key: string]: string }) => RegisterUser(values),
    validationSchema: Yup.object(yupSchemaRegister),
  });

  const submitForm = useCallback(
    (e: FormEvent<Form>) => {
      e.preventDefault();
      formik.isValid && formik.dirty ? formik.handleSubmit() : setIsFormSubmitError(true);
    },
    [formik]
  );

  const moveToLogin = useCallback(() => {
    dispatch(push("/login"));
  }, [dispatch]);

  return (
    <div className="container__app container__column container">
      <div className="container col-xs-8 register__form">
        <PageHeader>Register</PageHeader>
        <Form onSubmit={submitForm}>
          <hr />
          {paramsFormGroupsRegister.map((inputObjParams) => (
            <React.Fragment key={inputObjParams.name}>
              <FormGroupComponent
                inputObjParams={inputObjParams}
                isFormSubmitError={isFormSubmitError}
                isErrorDuplicate={isErrorDuplicate}
                blurOnFormControls={blurOnFormControls}
                handleBlur={formik.handleBlur}
                handleChange={formik.handleChange}
                setBlurOnFormControls={setBlurOnFormControls}
                setIsFormSubmitError={setIsFormSubmitError}
                setIsErrorDuplicate={setIsErrorDuplicate}
                touched={formik.touched[inputObjParams.name]}
                error={formik.errors[inputObjParams.name]}
                value={formik.values[inputObjParams.name]}
              />
            </React.Fragment>
          ))}

          <Button type={"submit"}>Submit</Button>
        </Form>
        <div className="register__footer">
          <p>Want to create a new account?</p>
          <Button bsStyle="link" onClick={moveToLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(RegisterApp);
