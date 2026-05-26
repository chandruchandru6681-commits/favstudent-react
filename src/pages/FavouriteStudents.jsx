import { useStudentContext } from '../context/StudentContext';

export default function FavouriteStudents() {
  const { favourites, removeFavourite } = useStudentContext();

  return (
    <section className="page-card">
      <div className="page-heading-row">
        <div>
          <h2>Favourite Students</h2>
          <p className="page-description">Quickly review your favourites and remove anyone you no longer want featured.</p>
        </div>
        <div className="favourite-summary">
          <span>Saved</span>
          <strong>{favourites.length}</strong>
        </div>
      </div>

      {favourites.length === 0 ? (
        <div className="empty-state">
          <p>No favourite students added yet. Head back to the student list to start building your roster.</p>
        </div>
      ) : (
        <div className="student-grid">
          {favourites.map((student) => {
            const initials = student.name
              .split(' ')
              .map((segment) => segment[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();

            return (
              <article key={student.id} className="student-card">
                <div className="student-card-top">
                  <div className="student-avatar avatar-secondary">{initials}</div>
                  <div>
                    <strong>{student.name}</strong>
                    <p>ID: {student.id}</p>
                  </div>
                </div>
                <button className="remove-button" onClick={() => removeFavourite(student.id)}>
                  Remove
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
