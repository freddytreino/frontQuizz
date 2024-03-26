import {Route,Routes} from 'react-router-dom'
import { Login } from '../views/Login'
import { Cadastro } from '../views/Cadastro'
import { Home } from '../views/Home'
import { Inicial } from '../views/Inicial'

export const LOGIN_ROUTE='/login'
export const CADASTRO_ROUTE='/cadastro'
export const HOME_ROTE='/home'
export const INICIAL_ROUTE ="/"

export function AppRoutes(){
    return(
        <Routes>
                <Route>
                     <Route path={LOGIN_ROUTE} element={<Login></Login>}/>
                </Route>

                <Route>
                     <Route path={CADASTRO_ROUTE} element={<Cadastro></Cadastro>}/>

                </Route>

                <Route>
                    <Route path={HOME_ROTE} element={<Home></Home>}/>
                </Route>

                <Route>
                    <Route path={INICIAL_ROUTE} element={<Inicial></Inicial>}/>
                </Route>

        </Routes>
    )
}