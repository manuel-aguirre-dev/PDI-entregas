import express from "express"
import registerRoutes from './routes/index.js'

const servidor = express();

servidor.use(express.json());

registerRoutes(servidor);

servidor.listen(3000, () =>{
console.log("El servidor esta en el puerto 3000");
});

