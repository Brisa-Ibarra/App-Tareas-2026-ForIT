
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './componentes/TaskList';
import TaskForm from './componentes/TaskForm';

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
          <div className="container-fluid px-4">
            <Link className="navbar-brand fw-bold fs-4" to="/">
              <i className="bi bi-check2-square me-2"></i>
              App Tareas
            </Link>
            
            <div className="d-flex align-items-center">
              <Link className="text-white text-decoration-none mx-3" to="/">
                <i className="bi bi-house-door me-1"></i>
                Inicio
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-grow-1" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="h-100">
            <Routes>
              <Route path='/' element={<TaskList/>}/>
              <Route path='/nueva' element={<TaskForm/>}/>
              <Route path='/editar/:id' element={<TaskForm/>}/>
            </Routes>
          </div>
        </main>

        <footer className="bg-white py-2 border-top">
          <div className="container text-center">
            <p className="mb-0 text-muted small">
              2026 - App de Tareas
            </p>
          </div>
        </footer>
      </div>
      {/*<h1>Hola: {data}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>  2026 - App de Tareas
      </div> */}
    </Router>
  )
}

export default App