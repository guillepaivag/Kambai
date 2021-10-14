const apiKambai = {
    url: process.env.NODE_ENV === 'development' ? 
        'http://localhost:5001/sistemareclamosande2021/southamerica-east1/appReucord/api' : 
        'https://southamerica-east1-sistemareclamosande2021.cloudfunctions.net/appReucord/api'
}

export default apiKambai