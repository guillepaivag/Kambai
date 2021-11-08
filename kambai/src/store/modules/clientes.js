import axios from '../../plugins/axios'
import { fb, db } from '@/plugins/firebase'

export default {
    state: {
        listaClientes: []
    },
    mutations: {
        
    },
    actions: {
        agregarCliente: async ({commit, dispatch}, data) => {
            try {
                const token = await dispatch('updateToken', {
                    root: true
                })
                
                const body = {
                    datosCliente: data.datosCliente,
                }
                
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    }
                }
    
                const res = await axios.post('/clientes/crearCliente', body, config)
                
                return {
                    ci: res.data.resultado.ci,
                    uidCliente: res.data.resultado.uid,
                }

            } catch (error) {
                console.log('error', error)
            }
        },
        actualizarCliente: async ({commit, dispatch}, data) => {
            try {
                const token = await dispatch('updateToken', {
                    root: true
                })
                
                const body = {
                    datosCliente: data.datosCliente,
                }
                
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    }
                }
    
                const res = await axios.put(`/clientes/actualizarCliente/${data.uidCliente}`, body, config)

                return {
                    uidCliente: res.data.resultado.uidCliente,
                }
                
            } catch (error) {
                console.log('error', error)
            }
        },
        eliminarCliente: async ({commit, dispatch}, data) => {
            try {
                const token = await dispatch('updateToken', {
                    root: true
                })
                
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    }
                }

                console.log('data.uidCliente', data.uidCliente)
    
                await axios.delete(`/clientes/eliminarCliente/${data.uidCliente}`, config)
            } catch (error) {
                console.log('error', error)
            }
        },
    },
    getters: {
        
    }
}