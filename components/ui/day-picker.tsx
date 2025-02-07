'use client'

import '@schedule-x/theme-default/dist/index.css'
import './day-picker.style.css';



export default function DayPicker({ onSelectedDays, value }: { onSelectedDays: (selectedDays: number[]) => void, value: number[] }) {


    return (
    
            <div className="grid grid-cols-5 w-full h-[400px] gap-2  rounded-lg">
                        <div data-selected={value[0]} onClick={() => {
                            const data = value.map((selected, index) => index === 0 ? selected === 0 ? 1 : 0 : selected)
                            onSelectedDays(data);
                        }} className="p-4 shadow flex items-center select-none justify-center text-xl rounded-md bg-[#141218] data-[selected=1]:bg-[#0099ff81] data-[selected=1]:border cursor-pointer">
                            <p className="text-white">LUNES</p>
                        </div>
    
                        <div data-selected={value[1]} onClick={() => {
                            const data = value.map((selected, index) => index === 1 ? selected === 0 ? 1 : 0 : selected)
                            onSelectedDays(data);
                        }} className="p-4 shadow flex items-center select-none justify-center text-xl rounded-md bg-[#141218] data-[selected=1]:bg-[#0099ff81] data-[selected=1]:border cursor-pointer">
                            <p className="text-white">MARTES</p>
                        </div>
    
                        <div data-selected={value[2]} onClick={() => {
                            const data = value.map((selected, index) => index === 2 ? selected === 0 ? 1 : 0 : selected)
                            onSelectedDays(data);
                        }} className="p-4 shadow flex items-center select-none justify-center text-xl rounded-md bg-[#141218] data-[selected=1]:bg-[#0099ff81] data-[selected=1]:border cursor-pointer">
                            <p className="text-white">MIERCOLES</p>
                        </div>
    
                        <div data-selected={value[3]} onClick={() => {
                            const data = value.map((selected, index) => index === 3 ? selected === 0 ? 1 : 0 : selected)
                            onSelectedDays(data);
                        }} className="p-4 shadow flex items-center select-none justify-center text-xl rounded-md bg-[#141218] data-[selected=1]:bg-[#0099ff81] data-[selected=1]:border cursor-pointer">
                            <p className="text-white">JUEVES</p>
                        </div>
    
                        <div data-selected={value[4]} onClick={() => {
                            const data = value.map((selected, index) => index === 4 ? selected === 0 ? 1 : 0 : selected)
                            onSelectedDays(data);
                        }} className="p-4 shadow flex items-center select-none justify-center text-xl rounded-md bg-[#141218] data-[selected=1]:bg-[#0099ff81] data-[selected=1]:border cursor-pointer">
                            <p className="text-white">VIERNES</p>
                        </div>
            </div>
        )
}

