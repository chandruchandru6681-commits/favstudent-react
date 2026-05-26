import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudentContext } from '../context/StudentContext';

export default function AddStudent() {
  const { addStudent, students } = useStudentContext();
  const [name, setName] = useState('');
  const [idValue, setIdValue] = useState('');
  const [grade, setGrade] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = idValue.trim().toUpperCase();
    const idPattern = /^[A-Z]{2,3}\d{4}$/; // 2-3 letters followed by 4 digits, e.g. ABC1234 or TN1234

    if (!name.trim() || !id || !idPattern.test(id)) {
      setError('Please enter a valid student name and registration number (e.g. ABC1234 or TN1234).');
      return;
    }

    if (students.some((student) => student.id === id)) {
      setError('A student with that registration number already exists.');
      return;
    }

    addStudent({ id, name: name.trim(), grade: grade.trim() });
    setName('');
    setIdValue('');
    setGrade('');
    setError('');
    navigate('/');
  };

  return (
    <section className="page-card add-student-page">
      <div className="page-heading-row">
        <div>
          <h2>Add Student</h2>
          <p className="page-description">Use this form to register a new student in the management portal.</p>
        </div>
      </div>

      <div className="add-student-layout">
        <div className="add-student-panel">
          <h3>Enter the Student details :</h3>
          <form className="student-form-table" onSubmit={handleSubmit}>
            <label>
              Name:
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Enter the Student Name" />
            </label>
            <label>
              Registration No:
              <input
                value={idValue}
                onChange={(event) => setIdValue(event.target.value)}
                placeholder="Enter registration number (e.g. CSE  1234 / EEE1234)"
              />
            </label>
            <label>
              Grade:
              <input value={grade} onChange={(event) => setGrade(event.target.value)} placeholder="Enter the Student Grade" />
            </label>
            {error && <p className="form-error">{error}</p>}
            <div className="form-actions">
              <button type="submit" className="primary-button add-submit-button">
                Add
              </button>
            </div>
          </form>
        </div>

        <aside className="add-student-sidebar">
          <div className="summary-card">
            <h3>Students Registered</h3>
            <strong>{students.length}</strong>
            <p>New students enroll here and appear in the student registry immediately.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
