type Role = {
    id: string
    name: string
    users: User[]
  }
  
  type User = {
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
  
  type Client =  {
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
  
  type Trainer = {
    id : number
    speciality: string
    user?: User
    user_id: number 
    certificates: Certificate[]
    clients: Client[]
  }
  
  type Certificate = {
    id:number 
    name:string
    trainers: Trainer[]
  }
  
  type Admin = {
    id : number
    user?: User
    user_id: number 
  }
  
  type Plan = {
    id: number 
    clients: Client[]
    trainings: Training[]
    name: string
    description: string
    billing_interval: string
    amount: number
  
  }
  
  type Training = {
    id: number 
    plan: Plan
    plan_id: number
    name: string
    excersises: Excersise[]
    schedule?: Schedule
  }
  
  type Excersise = {
    id: number 
    name: string
    description?: string
    repeats: number
    series: number
    duration: number
    trainings: Training[]
  }
  
  
  
  type Payment = {
    id: number 
    client: Client
    client_id:number
    amount: number
    method: string
    description: string
    date: Date
  }
  
  
  type Attendance = {
    id: number 
    client: Client
    client_id: number
    schedule: Schedule
    schedule_id: number
    attendance_date: Date
    status: boolean
  }
  
  type Schedule = {
    id: number 
    duration: number
    training: Training
    training_id: number 
    time_start: Date
    time_end: Date
    attendances: Attendance[]
    days: Day[]
  }
  
  
  type Day = {
    id: number 
    schedule: Schedule
    schedule_id: number
    day_of_week: string
  }
  
  type PageProps = {
    searchParams: Promise<{
      planId: string
    }>
    params: Promise<{
      id: string
    }>
  }