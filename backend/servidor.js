require('dotenv').config();
const express = require("express");
const cors = require('cors')
const r_tareas = require('./routes/tareas')
const app = express();

const PORT = process.env.PORT || 3000;

const corsOp = {
    origin:'http://localhost:5173'
}

app.use(cors(corsOp));
app.use(express.json());

// GET, POST, PUT, DELETE
/* app.get('/', (req, res) => {
    res.send("Hola Mundo");
})
*/

/*app.get('/', (req,res) => {
    res.json({hola: 'Hola mundo desde el servidor'})
})*/

app.get('/', (req, res) => {
    res.json({
        mensaje: 'La APi esta funcionando',
        endpoints: {
            obtenerTareas: 'GET /api/tasks',
            crearTarea: 'POST /api/tasks',
            editarTarea: 'PUT /api/tasks/:id',
            borrarTarea: 'DELETE /api/tasks/:id',
        }
    });
});

app.use('/api/tasks', r_tareas);

app.listen(PORT, ()=> console.log(`Servidor corriendo en el puerto ${PORT}`));