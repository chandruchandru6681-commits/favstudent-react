import { createContext, useContext, useMemo, useState } from 'react';

const StudentContext = createContext(null);

const initialStudents = [
  { id: 'CSE22001', name: 'Arun Kumar', grade: '8.5' },
  { id: 'MBA22002', name: 'Meenakshi S', grade: '9.1' },
  { id: 'CSE22003', name: 'Vignesh R', grade: '8.2' },
  { id: 'MBA22004', name: 'Priya N', grade: '9.0' },
  { id: 'CSE22005', name: 'Karthik P', grade: '7.8' },
  { id: 'CSE22006', name: 'Sahana R', grade: '8.7' },
  { id: 'MBA22007', name: 'Lakshmi M', grade: '8.9' },
  { id: 'CSE22008', name: 'Ramesh T', grade: '8.4' },
  { id: 'MBA22009', name: 'Anitha K', grade: '9.3' },
  { id: 'CSE22010', name: 'Manikandan S', grade: '7.9' },
  { id: 'MBA22011', name: 'Nandhini L', grade: '8.6' },
  { id: 'CSE22012', name: 'Tamilselvan V', grade: '8.1' },
  { id: 'CSE22013', name: 'Arpitha S', grade: '8.8' },
  { id: 'MBA22014', name: 'Gowtham K', grade: '8.3' },
  { id: 'CSE22015', name: 'Divya G', grade: '9.0' },
  { id: 'MBA22016', name: 'Sathish M', grade: '8.2' },
  { id: 'CSE22017', name: 'Janani R', grade: '8.9' },
  { id: 'MBA22018', name: 'Bharath N', grade: '8.0' },
  { id: 'CSE22019', name: 'Saranya P', grade: '8.6' },
  { id: 'MBA22020', name: 'Kavin K', grade: '8.4' },
  { id: 'CSE22021', name: 'Priya V', grade: '9.2' },
  { id: 'MBA22022', name: 'Shankar S', grade: '8.1' },
];

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(initialStudents);
  const [favourites, setFavourites] = useState([]);

  const addFavourite = (student) => {
    setFavourites((current) => {
      if (current.some((item) => item.id === student.id)) {
        return current;
      }
      return [...current, student];
    });
  };

  const removeFavourite = (studentId) => {
    setFavourites((current) => current.filter((student) => student.id !== studentId));
  };

  const addStudent = (student) => {
    setStudents((current) => {
      if (current.some((item) => item.id === student.id)) {
        return current;
      }
      return [...current, student];
    });
  };

  const value = useMemo(
    () => ({ students, favourites, addFavourite, removeFavourite, addStudent }),
    [students, favourites]
  );

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudentContext() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within StudentProvider');
  }
  return context;
}
