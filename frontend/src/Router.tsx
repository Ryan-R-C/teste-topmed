import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { RequirementsTesting } from './pages/RequirementsTesting'
import { ForgotPassword } from './pages/ForgotPassword'
import { SentEmail } from './pages/SentEmail'
import AuthProvider from './contexts/AuthProvider'
import { Home } from './pages/Home'

export default function Router() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/requirements-testing" element={<RequirementsTesting />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/email-sent" element={<SentEmail />} />
        <Route path="/home" element={<Home />} /> 
      </Routes>
    </AuthProvider>
  )
}
