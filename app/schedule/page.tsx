import myImage from '../../public/1.webp';

export default function SchedulePage() {
    // const localizer = dayjsLocalizer(dayjs.Dayjs);
    return (
    <div className="flex flex-col items-center justify-center shadow-[inset_0_0_0_500px_rgba(127,29,29,0.90)] min-h-screen pt-24" style={{ backgroundImage: `url(${myImage.src})`, backgroundSize: 'cover'}}>
        <p>Testing...</p>
        {/* <Calendar
            localizer={localizer}
         /> */}
    </div>
    )
}