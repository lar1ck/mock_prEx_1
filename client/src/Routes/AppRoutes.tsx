import { BrowserRouter, Routes as RouterRoutes, Route } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard/Dashboard'
import AuthPage from '../Pages/AuthPage/AuthPage'
import AuthMiddleware from '../middleware/authMiddleware'
import DashboardLayout from '../Pages/Dashboard/DashboardLayout'
import TradeManager from '../Pages/Trades/ViewTrades'
import ModuleManager from '../Pages/Modul/ModuleManager'
import TraineeManager from '../Pages/Trainees/TraineeManager'
import MarkManager from '../Pages/Marks/MarkManager'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path='/auth-page' element={< AuthPage />} />
        <Route element={< AuthMiddleware />}>
          <Route path='/' element={< DashboardLayout />} >
            <Route index element={<Dashboard />} />
            <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/view-trades' element={ <TradeManager /> }/>
              <Route path='/view-modules' element={ <ModuleManager /> }/>
              <Route path='/view-trainees' element={ <TraineeManager /> }/>
              <Route path='/view-marks' element={ <MarkManager /> }/>
            <Route />
          </Route>
        </Route>
      </RouterRoutes>
    </BrowserRouter>
  )
}

export default AppRoutes