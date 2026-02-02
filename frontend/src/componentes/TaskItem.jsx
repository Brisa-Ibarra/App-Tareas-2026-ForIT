import { Link } from "react-router-dom";

function TaskItem ({tarea, onDelete}){
    return (
        <div className="tarea-item">
            <h3>{tarea.titulo}</h3>

            {tarea.descripcion && (
                <p className="descripcion">{tarea.titulo}</p>
            )}

            <div className={`estado ${tarea.completada ? 'completada': 'pendiente'}`}>
                {tarea.completada ? 'Completada': 'Pendiente'}
            </div>

            {tarea.creacion && (
                <p className="fecha">
                    Creada : {new Date(tarea.creacion).toLocaleDateString()}
                </p>
            )}

            <div className="tarea-accion">
                <Link to={`/editar${tarea.id}`} className="boto-editar">
                    Editar
                </Link>

                <button onClick={()=> onDelete(tarea.id)} className="boton-eliminar">
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default TaskItem;