import {Route,Routes} from 'react-router-dom'
import { Login } from '../views/Login'
import { Cadastro } from '../views/Cadastro'
import { Home } from '../views/Home'
import { Inicial } from '../views/Inicial'
import { Escolher } from '../views/Play'
import { Informar } from '../views/Informacoes'
import { Adm } from '../views/adm'
import { QuestionForm } from '../views/criarQuest'
import { Math } from '../views/matematica'

export const LOGIN_ROUTE='/login'
export const CADASTRO_ROUTE='/cadastro'
export const HOME_ROTE='/home'
export const INICIAL_ROUTE ="/"
export const PLAY_ROUTE ="/escolha"
export const INFORMACOES_ROUTE ="/informacoes"
export const ADM_ROUTE = "/adm"
export const QUEST_ROUTE ="/quest"
export const MATEMATICA_ROUTE="/matematica"

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
                <Route>
                    <Route path={PLAY_ROUTE} element={<Escolher></Escolher>}/>
                </Route>
                <Route>
                    <Route path={INFORMACOES_ROUTE} element={<Informar></Informar>}/>
                </Route>
                <Route>
                    <Route path={ADM_ROUTE} element={<Adm></Adm>}/>
                </Route>
                <Route>
                    <Route path={QUEST_ROUTE} element={<QuestionForm></QuestionForm>}/>
                </Route>
                <Route>
                    <Route path={MATEMATICA_ROUTE} element={<Math></Math>}/>
                </Route>
        </Routes>
    )
}