import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { StudentProvider, useStudentContext } from './context/StudentContext';
import StudentList from './pages/StudentList';
import FavouriteStudents from './pages/FavouriteStudents';
import AddStudent from './pages/AddStudent';

function AppContent() {
  const { students, favourites } = useStudentContext();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-block">
          <h1>Student Management</h1>
          <p className="app-tagline">A modern portal for managing students and favourites.</p>
        </div>

        <div className="app-actions">
          <label className="search-field">
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search Students.."
            />
          </label>
        </div>
      </header>

      <section className="app-nav-card">
        <div>
          <p className="page-subtitle">Student</p>
          <h2>Management Portal</h2>
        </div>
        <nav className="portal-tabs">
          <NavLink to="/" end className={({ isActive }) => `tab-button${isActive ? ' active' : ''}`}>
            All Students
          </NavLink>
          <NavLink to="/favourites" className={({ isActive }) => `tab-button${isActive ? ' active' : ''}`}>
            Favourites
          </NavLink>
          <NavLink to="/addstudent" className={({ isActive }) => `tab-button${isActive ? ' active' : ''}`}>
            Add Student
          </NavLink>
        </nav>
      </section>

      <section className="app-stats-row">
        <div className="stat-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>
        <div className="stat-card">
          <span>Favourite Students</span>
          <strong>{favourites.length}</strong>
        </div>
      </section>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<StudentList searchQuery={searchQuery} />} />
          <Route path="/favourites" element={<FavouriteStudents />} />
          <Route path="/addstudent" element={<AddStudent />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <StudentProvider>
        <AppContent />
      </StudentProvider>
    </BrowserRouter>
  );
}

export default App;
