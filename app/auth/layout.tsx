import myImage from '../../public/1.webp';
export default function LayoutAuth({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className="min-h-screen md:p-2 flex justify-end" style={{ backgroundImage: `linear-gradient(115deg, rgba(183, 52, 52, 0.99) 0%, rgba(185, 30, 30, 0) 45%, rgba(30, 19, 19, 0.08) 76%), url(${myImage.src})`, backgroundSize: 'contain', }}>
          <div className="p-8 bg-[#6a0909b8] md:rounded-md shadow flex-grow md:flex-grow-0 flex flex-col items-center pt-48">
            {children}
          </div>
      </div>
    )

}


