import { Formik, Form, Field, ErrorMessage } from 'formik';
import './ContactForm.css';
import '../../pages/Contact/Contact.css';

const ContactForm = () => {
  return (
    <div>
      <Formik
        initialValues={{
          nombre: '',
          email: '',
          tel: '',
          tipo_consulta: '',
          mensaje: '',
          acceptance: '',
        }}
        onSubmit={(values) => console.log(values)}
      >
        <Form className="contact-form">
          <label>Nombre:</label>
          <Field name="nombre" type="text" />
          <ErrorMessage name="nombre" />

          <label>Correo electrónico:</label>
          <Field name="email" type="email" />
          <ErrorMessage name="nombre" />

          <label>Teléfono:</label>
          <Field name="tel" type="number" />
          <ErrorMessage name="tel" />

          <label>Tipo de consulta:</label>
          <Field name="tipo_consulta" as="select">
            <option value="consulta1">Tipo de consulta 1</option>
            <option value="consulta2">Tipo de consulta 2</option>
            <option value="consulta3">Tipo de consulta 3</option>
          </Field>
          <ErrorMessage name="tipo_consulta" />
          <label>Mensaje:</label>
          <Field name="mensaje" as="textarea" rows="5" />
          <ErrorMessage name="mensaje" />
          <label>
            <Field type="checkbox" name="acceptance" />
            He leído y acepto la política de privacidad
          </label>
          <ErrorMessage name="acceptance" />

          <button type="submit">Enviar formulario</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
