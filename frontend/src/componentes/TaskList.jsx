// src/componentes/TaskList.jsx - VERSIÓN MEJORADA
import { useEffect, useState } from "react";
import { api } from '../api';
import { Link } from "react-router-dom";

function TaskList() {
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerTareas = async () => {
            setCargando(true);
            const result = await api.getTareas();
            
            if (result.success) {
                setTareas(result.data);
            }
            
            setCargando(false);
        };
        obtenerTareas();
    }, []);

    const borrarTarea = async (id) => {
        if (!window.confirm('Seguro que quieres eliminar esta tarea?')) {
            return;
        }
        
        const result = await api.deleteTarea(id);
        
        if (result.success) {
            setTareas(tareas.filter(t => t.id !== id));
        }
    };

    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Cargando</span>
                    </div>
                    <h4 className="mt-3">Cargando tareas</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="display-5 fw-bold text-dark mb-2">
                            <i className="bi bi-list-task text-primary me-3"></i>
                            Mis Tareas
                        </h1>
                    </div>
                    <Link to='/nueva' className="btn btn-primary btn-lg shadow">
                        <i className="bi bi-plus-circle me-2"></i>
                        Nueva Tarea
                    </Link>
                </div>

                {tareas.length === 0 ? (
                    <div className="text-center py-5 my-5 bg-white rounded-3 shadow-sm">
                        <div className="mb-4">
                            <i className="bi bi-clipboard text-muted" style={{ fontSize: '5rem' }}></i>
                        </div>
                        <h2 className="h3 text-dark mb-3">¡No hay tareas creadas!</h2>
                        <Link to="/nueva" className="btn btn-primary px-5 py-3 fs-5">
                            <i className="bi bi-plus-circle me-2"></i>
                            Crear Primera Tarea
                        </Link>
                    </div>
                ) : (
                    <div className="row g-4">
                        {tareas.map((tarea) => (
                            <div key={tarea.id} className="col-12 col-md-6 col-lg-4">
                                <div className={`card h-100 shadow-sm border-0 ${tarea.completada ? 'border-success border-2' : ''}`}>
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h5 className="card-title fw-bold mb-0">{tarea.titulo}</h5>
                                            <span className={`badge ${tarea.completada ? 'bg-success' : 'bg-warning'}`}>
                                                {tarea.completada ? 'Completada' : 'Pendiente'}
                                            </span>
                                        </div>
                                        
                                        {tarea.descripcion && (
                                            <p className="card-text text-muted flex-grow-1">{tarea.descripcion}</p>
                                        )}

                                        {tarea.creacion && (
                                            <div className="mt-2 pt-2 border-top">
                                                <small className="text-muted">
                                                    <i className="bi bi-calendar me-1"></i>
                                                    Creada: {new Date(tarea.creacion).toLocaleDateString()}
                                                </small>
                                            </div>
                                        )}
                                        
                                        <div className="mt-4 pt-3 border-top">
                                            <div className="d-flex justify-content-between">
                                                <Link 
                                                    to={`/editar/${tarea.id}`}
                                                    className="btn btn-outline-primary"
                                                >
                                                    <i className="bi bi-pencil me-1"></i>
                                                    Editar
                                                </Link>
                                                
                                                <button 
                                                    onClick={() => borrarTarea(tarea.id)}
                                                    className="btn btn-outline-danger"
                                                >
                                                    <i className="bi bi-trash me-1"></i>
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskList;