import axios from '../../plugins/axios'
import { fb, db } from '@/plugins/firebase'

export default {
    state: {
        listaPacientes: []
    },
    mutations: {
        
    },
    actions: {
        agregarPaciente: async ({commit, dispatch}, data) => {
            try {
                const token = await dispatch('updateToken', {
                    root: true
                })
                
                const body = {
                    datosPaciente: data.datosPaciente,
                }
                
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    }
                }
    
                const res = await axios.post('/pacientes/crearPaciente', body, config)
                
                return {
                    uidPaciente: res.data.resultado.uid,
                    uidCliente: res.data.resultado.uidCliente,
                }

            } catch (error) {
                console.log('error', error)
            }
        },
        actualizarPaciente: async ({commit, dispatch}, data) => {
            try {
                const token = await dispatch('updateToken', {
                    root: true
                })
                
                const body = {
                    datosPaciente: data.datosPaciente,
                }
                
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}` 
                    }
                }
    
                const res = await axios.put(`/pacientes/actualizarPaciente/${data.uidPaciente}`, body, config)

                return res.data.resultado

            } catch (error) {
                console.log('error', error)
            }
        },
        eliminarPaciente: async ({commit, dispatch}, data) => {
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
    
                await axios.delete(`/pacientes/eliminarPaciente/${data.uidPaciente}`, config)
            } catch (error) {
                console.log('error', error)
            }
        },
    },
    getters: {
        
    }
}