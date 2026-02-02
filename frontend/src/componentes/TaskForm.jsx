import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../api';
import { useEffect, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskForm() {
    const { id } = useParams();
    const navegador = useNavigate();

    const [formulario, setFormulario] = useState({
        titulo: '',
        descripcion: '',
        completada: false,
    });

    const [cargando, setCargando] = useState(false);
    const [cargandoInicial, setCargandoInicial] = useState(!!id);

    const cargarTarea = useCallback(async () => {
        if (!id) return;
        
        console.log('Cargando tarea con ID:', id);
        setCargandoInicial(true);
        
        try {
            const respuesta = await api.getTarea(id);
            console.log('📦 Respuesta de API:', respuesta);
            
            if (respuesta.success && respuesta.data) {
                console.log('Datos recibidos:', respuesta.data);

                setFormulario({
                    titulo: respuesta.data.titulo || '',
                    descripcion: respuesta.data.descripcion || '',
                    completada: respuesta.data.completada || false,
                });
                
                console.log('Formulario establecido');
                
            } else {
                console.error('Error en respuesta:', respuesta);
                alert(respuesta.mensaje || 'Error al cargar la tarea');
                navegador('/');
            }
        } catch (error) {
            console.error(' Error al obtener tarea:', error);
            alert('Error de conexión al cargar la tarea');
            navegador('/');
        } finally {
            setCargandoInicial(false);
        }
    }, [id, navegador]);

    useEffect(() => {
        if (id) {
            cargarTarea();
        }
    }, [id, cargarTarea]);

    useEffect(() => {
        console.log('Estado actual del formulario:', formulario);
    }, [formulario]);

    const handleChange = (e) => {
        const {name, value, checked, type} = e.target;
        setFormulario(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            let resultado;

            if (id) {
                resultado = await api.putTarea(id, formulario);
            } else {
                resultado = await api.postTarea(formulario);
            }

            if (resultado && resultado.success) {
                navegador('/');
            } else {
                alert(resultado?.mensaje || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Error al guardar la tarea');
        } finally {
            setCargando(false);
        }
    };

    if (cargandoInicial) {
        return (
            <div className="container-fluid py-4 bg-light d-flex justify-content-center align-items-center" 
                    style={{ minHeight: 'calc(100vh - 120px)' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" 
                            style={{width: '3rem', height: '3rem'}} 
                            role="status">
                        <span className="visually-hidden">Cargando tarea...</span>
                    </div>
                    <h4 className="text-primary">Cargando tarea #{id}...</h4>
                    <p className="text-muted">Obteniendo información de la tarea</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4 bg-light" style={{ minHeight: 'calc(100vh - 120px)' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-8">
                        <div className="card shadow border-0">
                            <div className="card-header bg-primary text-white py-4">
                                <h1 className="h2 mb-0">
                                    <i className="bi bi-pencil-square me-3"></i>
                                    {id ? `Editando Tarea #${id}` : 'Nueva Tarea'}
                                </h1>
                            </div>
                            
                            <div className="card-body p-4 p-md-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="bi bi-card-heading me-2"></i>
                                            Título
                                        </label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-lg"
                                            name="titulo" 
                                            value={formulario.titulo || ''} 
                                            onChange={handleChange}
                                            placeholder="¿Qué necesitas hacer?"
                                            required 
                                            disabled={cargando || cargandoInicial}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold fs-5">
                                            <i className="bi bi-text-paragraph me-2"></i>
                                            Descripción
                                        </label>
                                        <textarea 
                                            className="form-control"
                                            name="descripcion" 
                                            value={formulario.descripcion || ''} 
                                            onChange={handleChange}
                                            placeholder="Agrega detalles importantes..."
                                            rows="4"
                                            disabled={cargando || cargandoInicial}
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <div className="form-check form-switch">
                                            <input 
                                                className="form-check-input"
                                                type="checkbox"
                                                id="completada"
                                                name="completada" 
                                                checked={formulario.completada || false}
                                                onChange={handleChange}
                                                disabled={cargando || cargandoInicial}
                                                role="switch"
                                                style={{ width: '3em', height: '1.5em' }}
                                            />
                                            <label className="form-check-label fw-bold fs-5 ms-3" htmlFor="completada">
                                                <i className="bi bi-check-circle me-2"></i>
                                                Completada: {formulario.completada ? 'Sí' : 'No'}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between pt-4 border-top">
                                        <button 
                                            type="button" 
                                            className="btn btn-outline-secondary btn-lg px-4"
                                            onClick={() => navegador('/')}
                                            disabled={cargando || cargandoInicial}
                                        >
                                            <i className="bi bi-arrow-left me-2"></i>
                                            Cancelar
                                        </button>
                                        
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary btn-lg px-5"
                                            disabled={cargando || cargandoInicial}
                                        >
                                            {cargando ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                    Guardando
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-save me-2"></i>
                                                    {id ? 'Actualizar Tarea' : 'Crear Tarea'}
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskForm;