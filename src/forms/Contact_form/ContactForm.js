import { Formik, Form, Field, ErrorMessage } from 'formik';
/* import * as Yup from 'yup'; */
import './ContactForm.css';
import '../../pages/Contact/Contact.css';

const validateName = (value) => {
	let error;
	if (!value) {
		error = 'Campo obligatorio';
	} else if (value.length <= 2) {
		error = 'Nombre muy corto';
	} else if (value.length > 15) {
		error = 'Nombre muy largo';
	}

	return error;
};

const validateEmail = (value) => {
	let error;
	if (!value) {
		error = 'Campo obligatorio';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
		error = 'Email incorrecto';
	}
	return error;
};

/* const ContactFormSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(2, 'demasiado corto')
    .max(50, 'demasiado largo')
    .required('campo obligatorio'),
  email: Yup.string().email('email incorrecto').required('campo obligatorio'),
}); */

const ContactForm = () => {
	return (
		<div className='contact-form'>
			<h1>Contacto</h1>
			<div className='contact-form-container'>
				<Formik
					initialValues={{
						nombre: '',
						email: '',
						tel: '',
						tipo_consulta: '',
						mensaje: '',
						acceptance: '',
					}}
					onSubmit={(values) => console.log('values', values)}
					/*  ValidationSchema={ContactFormSchema} */
				>
					{({ errors, touched, validateField, validateForm }) => (
						<Form className='generalform'>
							<label className="generallabel">Nombre:</label>
							<Field className="generalinput" name='nombre' type='text' validate={validateName} />
							{errors.nombre && touched.nombre && <h3 className="errorform">{errors.nombre}</h3>}

							<label className="generallabel">Correo electrónico:</label>
							<Field className="generalinput" name='email' type='email' validate={validateEmail} />
							{errors.email && touched.email && <h3>{errors.email}</h3>}

							<label className="generallabel">Teléfono:</label>
							<Field className="generalinput" name='tel' type='number' />
							<ErrorMessage name='tel' />

							<label className="generallabel">Tipo de consulta:</label>
							<Field className="generalinput" name='tipo_consulta' as='select'>
								<option value='consulta1'>consulta1</option>
								<option value='consulta2'>consulta2</option>
								<option value='consulta3'>consulta3</option>
							</Field>
							<ErrorMessage name='tipo_consulta' />
							<label className="generallabel">Mensaje:</label>
							<Field className="generalinput" name='mensaje' as='textarea' rows='5' />
							<ErrorMessage name='mensaje' />
							<label>
								<Field type='checkbox' name='acceptance' />
								He leído y acepto la política de privacidad
							</label>
							<ErrorMessage name='acceptance' />

							<button
								type='submit'
								className="generalbutton"
								onClick={() =>
									validateForm().then(() =>
										console.error('Hay errores en el formulario')
									)
								}
							>
								Enviar
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default ContactForm;
