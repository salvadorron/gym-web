interface Config {
    apiUrl: string
}

const localConfig: Config = {
    apiUrl: 'https://special-system-4vwp7qwgwgx2jq5w-4200.app.github.dev/api'
}

const prodConfig: Config = {
    apiUrl: 'https://gym-service.vercel.app/api'
}

const {
    NEXT_PUBLIC_NODE_ENV = 'development'
} = process.env


export const apiUrl = NEXT_PUBLIC_NODE_ENV === 'development' ? localConfig.apiUrl : prodConfig.apiUrl