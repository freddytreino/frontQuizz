import axios from "axios";

export async function criarConta(dados){
    console.log(dados)
    try {
        await axios.post("https://backquizz.onrender.com/perfil", {
          perfil:{
              email: dados.email,
              senha: dados.password
              
            },
            nome: dados.name,
        })

        return {
            error: false,
            message: 'Usuário Criado'
        }
    } catch (error) {
        console.log(error.response.data);
        return {
            error: true,
            message: 'Erro ao criar usuario'
        }
    }
}

