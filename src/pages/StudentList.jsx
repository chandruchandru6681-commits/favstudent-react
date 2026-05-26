import { useMemo } from 'react';
import { useStudentContext } from '../context/StudentContext';

export default function StudentList({ searchQuery }) {
  const { students, favourites, addFavourite } = useStudentContext();

  const filteredStudents = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) return students;
    return students.filter((student) => student.name.toLowerCase().includes(normalizedQuery));
  }, [searchQuery, students]);

  return (
    <section className="page-card">
      <div className="page-heading-row">
        <div>
          <h2>All Students</h2>
          <p className="page-description">Browse the roster and add top performers to your favourites.</p>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="empty-state">
          <p>No students match your search. Try another name.</p>
        </div>
      ) : (
        <div className="student-grid">
          {filteredStudents.map((student) => {
            const isFavourite = favourites.some((item) => item.id === student.id);
            const initials = student.name
              .split(' ')
              .map((segment) => segment[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <article key={student.id} className="student-card">
                <div className="student-card-top">
                  <div className="student-avatar">{initials}</div>
                  <div>
                    <strong>{student.name}</strong>
                    <p>{student.id}</p>
                    {student.grade && <p>Grade: {student.grade}</p>}
                  </div>
                </div>
                <button
                  className={`action-button ${isFavourite ? 'disabled' : ''}`}
                  onClick={() => addFavourite(student)}
                  disabled={isFavourite}
                >
                  {isFavourite ? 'Added to Favourite' : 'Add to Favourite'}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
