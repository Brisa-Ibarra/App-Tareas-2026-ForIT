/*export const api = async () => {
    const respuesta = await fetch('http://localhost:3000')
    const data = respuesta.json()
    return data
}*/

const API_URL = import.meta.env.VITE_API_URL;

export const api = {
    getTareas: async() => {

        try{
            const respuesta = await fetch(`${API_URL}/api/tasks`)
            const data = await respuesta.json();
            return data;

        }catch(error){
            console.error('Error no se encontraron tareas:', error);
            return {
                success: false,
                mensaje: 'No se encontraron tareas',
                error: error.message
            }
        }
        
    },

    getTarea: async (id) => {
        const response = await fetch(`${API_URL}/api/tasks/${id}`);
        return await response.json();
    },

    postTarea: async (tarea) => {

        try{
            const respuesta = await fetch(`${API_URL}/api/tasks`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(tarea)
            });

            return await respuesta.json();
        }catch(error){
            console.error('Error no se logro crear una tarea:', error);
            return {
                success: false,
                mensaje: 'No se logro crear la tarea',
                error: error.message
            }
        }
        
    },

    putTarea: async (id, cambios) => {

        try{
            const respuesta = await fetch(`${API_URL}/api/tasks/${id}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(cambios)
            });

            return await respuesta.json();
        }catch(error){
            console.error('Error no se logro editar la tarea:', error);
            return {
                success: false,
                mensaje: 'No se logro editar la tarea',
                error: error.message
            }
        }

    },

    deleteTarea: async (id) => {

        try{
            const respuesta = await fetch(`${API_URL}/api/tasks/${id}`, {
                method: 'DELETE'
            });

            return await respuesta.json();
        }catch(error){
            console.error('Error no se logro borrar la tarea:', error);
            return {
                success: false,
                mensaje: 'No se logro borrar la tarea',
                error: error.message
            }
        }

    }
}