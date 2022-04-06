import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import "../../pages/Contact/Contact.css";
import { GiAirBalloon } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const validateName = (value) => {
  let error;
  if (!value) {
    error = "Campo obligatorio";
  } else if (value.length <= 2) {
    error = "Nombre muy corto";
  } else if (value.length > 15) {
    error = "Nombre muy largo";
  }

  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = "Campo obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Email incorrecto";
  }
  return error;
};

const ContactForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="form-wrapper">
      <Formik
        initialValues={{
          nombre: "",
          email: "",
          tel: "",
          tipo_consulta: "",
          mensaje: "",
          acceptance: "",
        }}
      >
        {({ errors, touched, validateField, validateForm }) => (
          <Form className="generalForm">
            <h1 className="generalTítulo1">Contacto</h1>
            <label className="generalLabel">Nombre:</label>
            <Field
              className="generalInput"
              name="nombre"
              type="text"
              validate={validateName}
            />
            {errors.nombre && touched.nombre && (
              <h3 className="errorValidation">{errors.nombre}</h3>
            )}

            <label className="generalLabel">Correo electrónico:</label>
            <Field
              className="generalInput"
              name="email"
              type="email"
              validate={validateEmail}
            />
            {errors.email && touched.email && (
              <h3 className="errorValidation">{errors.email}</h3>
            )}

            <label className="generalLabel">Teléfono:</label>
            <Field className="generalInput" name="tel" type="number" />
            <ErrorMessage className="errorValidation" name="tel" />

            <label className="generalLabel">Tipo de consulta:</label>
            <Field
              className="generalInput custom-select"
              name="tipo_consulta"
              as="select"
            >
              <option value="consulta1">consulta1</option>
              <option value="consulta2">consulta2</option>
              <option value="consulta3">consulta3</option>
            </Field>
            <ErrorMessage className="errorValidation" name="tipo_consulta" />
            <label className="generalLabel">Mensaje:</label>
            <Field className="generalTextarea" name="mensaje" as="textarea" />
            <ErrorMessage className="errorValidation" name="mensaje" />
            <label className="terminosConditions">
              <Field
                className="checkboxBox"
                type="checkbox"
                name="acceptance"
              />
              He leído y acepto la política de privacidad
            </label>
            <ErrorMessage className="errorValidation" name="acceptance" />

            <button
              type="submit"
              className="generalButton"
              onClick={() =>
                validateForm().then(() => {
                  toast.success("Formulario enviado con éxito");
                  navigate("/");
                })
              }
            >
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
