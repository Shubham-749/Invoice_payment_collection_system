// src/index.ts
import * as express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/user', require('./routes/userRoutes'));
app.use('/invoice', require('./routes/invoiceRoutes'));
app.use('/payment', require('./routes/paymentRoutes'));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});