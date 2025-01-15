export type Role = {
    id: string
    name: string
    users: User[]
  }
  
  export type User = {
    id : number
    username: string
    password: string
    name: string 
    lastName: string
    age: number
    role?: Role 
    roleId: string
    client?: Client
    trainer?: Trainer
    admin?: Admin
  }
  
  export type Client =  {
    id : number
    training_progress: number
    user?: User
    user_id: number 
    plan?: Plan
    plan_id?: number
    payments: Payment[]
    attendances: Attendance[]
    trainer?: Trainer
    trainer_id?: number
  }
  
  export type Trainer = {
    id : number
    speciality: string
    user?: User
    user_id: number 
    certificates: Certificate[]
    clients: Client[]
  }
  
  export type Certificate = {
    id:number 
    name:string
    trainers: Trainer[]
  }
  
  export type Admin = {
    id : number
    user?: User
    user_id: number 
  }
  
  export type Plan = {
    id: number 
    clients: Client[]
    trainings: Training[]
    name: string
    description: string
    billing_interval: string
    amount: number
  
  }
  
  export type Training = {
    id: number 
    plan: Plan
    plan_id: number
    name: string
    excersises: Excersise[]
    schedule?: Schedule
  }
  
  export type Excersise = {
    id: number 
    name: string
    description?: string
    repeats: number
    series: number
    duration: number
    trainings: Training[]
  }
  
  
  
  export type Payment = {
    id: number 
    client: Client
    client_id:number
    amount: number
    method: string
    description: string
    date: Date
  }
  
  
  export type Attendance = {
    id: number 
    client: Client
    client_id: number
    schedule: Schedule
    schedule_id: number
    attendance_date: Date
    status: boolean
  }
  
  export type Schedule = {
    id: number 
    duration: number
    training: Training
    training_id: number 
    time_start: Date
    time_end: Date
    attendances: Attendance[]
    days: Day[]
  }
  
  
  export type Day = {
    id: number 
    schedule: Schedule
    schedule_id: number
    day_of_week: string
  }
  
  export type PageProps = {
    searchParams: Promise<{
      planId: string
    }>
    params: Promise<{
      id: string
    }>
  }