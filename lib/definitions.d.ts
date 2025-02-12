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
    city: string
    stateId: string
    parrishId: string
    municipalityId: string
    address: string
    weight: number
    height: number
    zipCode: string
    medicalConditions: string
    gender: "MALE" | "FEMALE"
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
    features: string
    duration: string
    price: number
  
  }
  
  export type Training = {
    id: number 
    plan: Plan
    plan_id: number
    name: string
    excersises: Excersise[]
    schedule: Schedule
  }
  
export interface Exercise {
  id: string
  name: string
  description: string
  muscleGroup: string
  equipment: string
  difficulty: "BEGGINER" | "INTERMEDIATE" | "ADVANCED"
  type: ExerciseType
}

export interface RepetitionExercise {
  id: string
  type: "repetitions"
  sets: number
  reps: number
  weight?: number
  notes?: string
}

export interface DurationExercise {
  id: string
  type: "duration"
  duration: number // en minutos
  intensity?: "LOW" | "MEDIUM" | "HIGH"
  distance?: number // en kilómetros
  notes?: string
}

export type WorkoutExercise = RepetitionExercise | DurationExercise

export interface Workout {
  id: string
  name: string
  description: string
  exercises: WorkoutExercise[]
}

  
  
  
  export type Payment = {
    id: number 
    client: Client
    client_id:number
    amount: number
    method: string
    description: string
    startDate: Date
    endDate: Date
    status: string
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
    turn: string
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

  export type Meal = {
    id: string;
    name: string;
    description: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
    ingredients: string[];
    image: string;
  
  }

  export type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

  type State = {
    id: number
    name: string
    municipalities: Municipality[]
  }
  
  type Municipality = {
    id: number
    name: string
    state_id: number
    parishes: Parrish[]
  }
  
  type Parrish = {
    id: number
    name: string
    municipality_id: number
  }

  export type Member = User & { specialty?: string }