export default {
    state: {
        indexClientes: '',
        indexPacientes: '',
    },
    mutations: {
        setIndexClientes (state) {
            console.log('process.env.NODE_ENV', process.env.NODE_ENV)
            state.indexClientes = process.env.NODE_ENV === 'production' ? 'prod_clientes' : 'dev_clientes'
        },
        setIndexPacientes (state) {
            console.log('process.env.NODE_ENV', process.env.NODE_ENV)
            state.indexPacientes = process.env.NODE_ENV === 'production' ? 'prod_pacientes' : 'dev_pacientes'
        },
    },
    actions: {
        
    },
    getters: {
        getIndexClientes (state) {
            return state.indexClientes
        },
        getIndexPacientes (state) {
            return state.indexPacientes
        },
    }
}