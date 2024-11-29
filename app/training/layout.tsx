import Toolbar from "../ui/toolbar";

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-red-900">
            <Toolbar />
            {children}
        </div>
    )
}