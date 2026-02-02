const express = require('express');
const r_tareas = express.Router();

let tareas = [];
let id = 1;

r_tareas.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: tareas
        });
    } catch (error) {
        console.error('error:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error del servidor'
        });
    }
});

r_tareas.get('/:id', (req, res) => {
    try {
        const idTarea = parseInt(req.params.id);
        const tarea = tareas.find(t => t.id === idTarea);

        if (!tarea) {
            return res.status(404).json({
                success: false,
                mensaje: 'No se encontró la tarea'
            });
        }

        res.json({
            success: true,
            data: tarea
        });
    } catch (error) {
        console.error('Error al obtener tarea:', error);
        res.status(500).json({
            success: false,
            mensaje: 'Error del servidor'
        });
    }
});

r_tareas.post('/', (req, res) => {
    try {
        const { titulo, descripcion } = req.body;

        if (!titulo || titulo.trim() === '') {
            return res.status(400).json({
                success: false,
                mensaje: 'El título es requerido'
            });
        }
        
        const nuevoId = tareas.length > 0 
            ? Math.max(...tareas.map(t => t.id)) + 1 
            : 1;
        
        const nuevaTarea = {
            id: nuevoId,
            titulo: titulo.trim(),
            descripcion: descripcion ? descripcion.trim() : '',
            completada: false, 
            creacion: new Date()
        };

        tareas.push(nuevaTarea);
        res.json({
            success: true,
            data: nuevaTarea
        });
    } catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({
            success: false,
            mensaje: 'No se logró crear la tarea'
        });
    }
});

r_tareas.put('/:id', (req,res)=>{
    const idTarea = parseInt(req.params.id);
    const {titulo, descripcion, completada} = req.body;

    const t_index = tareas. findIndex(t => t.id === idTarea);

    if (t_index < 0){
        return res.status(404).json({
            success:false,
            mensaje: 'No se encontro la tarea'
        });
    }

    if (titulo !== undefined) {
        tareas[t_index].titulo = titulo.trim();
    }

    if (descripcion !== undefined) {
        tareas[t_index].descripcion = descripcion.trim();
    }

    if (completada !== undefined) {
        tareas[t_index].completada = completada;
    }

    res.json({
        success: true,
        data: tareas[t_index]
    });
})

r_tareas.delete('/:id', (req,res)=> {
    const idTarea = parseInt(req.params.id);
    const t_index = tareas.findIndex(t => t.id == idTarea);

    if (t_index < 0){
        return res.status(404).json({
            success:false,
            mensaje: 'No se encontro la tarea'
        });
    }

    const t_eliminada = tareas.splice(t_index, 1)[0];

    res.json({
        success: true,
        mensaje: 'La tarea se elimino',
        data: t_eliminada
    })

});

module.exports = r_tareas;