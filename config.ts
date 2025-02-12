interface Config {
    apiUrl: string
}

const localConfig: Config = {
    apiUrl: 'http://localhost:4200/api'
}

const prodConfig: Config = {
    apiUrl: 'https://gym-service.vercel.app/api'
}

const {
    NEXT_PUBLIC_NODE_ENV = 'development'
} = process.env


export const apiUrl = NEXT_PUBLIC_NODE_ENV === 'development' ? localConfig.apiUrl : prodConfig.apiUrl