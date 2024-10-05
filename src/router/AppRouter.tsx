import { Navigate, Route, Routes } from 'react-router';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { CheckingAuth } from '../ui';
import { useCheckAuth } from '../hooks';
import { JournalRoutes } from '../journal/routes/JournalRoutes';

export const AppRouter = () => {

  const status = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>
      {
        status === 'authenticated' && (
          <Route path="*" element={<JournalRoutes />} />
        )
      }
      {
        status === 'not-authenticated' && (
          <Route path="/auth/*" element={<AuthRoutes />} />
        )
      }
      <Route path="/*" element={<Navigate to='/auth/login' />} />
    </Routes>
  )
}
