const express = require('express');
const Joi = require('joi');
const swaggerUi = require('swagger-ui-express');
const app = express();
app.use(express.json());

let contacts = [];
let idCounter = 1;

const contactSchema = Joi.object({
  name: Joi.string().min(1).required(),
  phone: Joi.string().pattern(/^\+?\d{7,15}$/).required(),
  email: Joi.string().email().required()
});

app.get('/contacts', (req, res) => {
  res.json(contacts);
});

app.get('/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id));
  if (!contact) return res.status(404).json({ error: 'Contacto no encontrado' });
  res.json(contact);
});

app.post('/contacts', (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const contact = { id: idCounter++, ...req.body };
  contacts.push(contact);
  res.status(201).json(contact);
});

app.put('/contacts/:id', (req, res) => {
  const contact = contacts.find(c => c.id === parseInt(req.params.id));
  if (!contact) return res.status(404).json({ error: 'Contacto no encontrado' });
  const { error } = contactSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  contact.name = req.body.name;
  contact.phone = req.body.phone;
  contact.email = req.body.email;
  res.json(contact);
});

app.delete('/contacts/:id', (req, res) => {
  const index = contacts.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Contacto no encontrado' });
  contacts.splice(index, 1);
  res.status(204).send();
});

const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('API de contactos escuchando en puerto 3000');
});
