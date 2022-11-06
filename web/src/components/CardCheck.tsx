import Image from "next/image";
import iconCheckImg from "../assets/icon-check.svg";

interface CardCheckProps {
    title: string;
    description: string;
}
export function CardCheck({ title, description }: CardCheckProps) {
    return (
        <div className="flex items-center w-full gap-6 p-4 ">
            <Image src={iconCheckImg} alt="" className="min-h-[2.5rem] min-w-[2.5rem] max-h-[2.5rem] max-w-[2.5rem] w-auto h-auto" />
            <div className="flex flex-col">
                <span className="text-2xl font-bold">{title}</span>
                <span className="whitespace-nowrap">{description}</span>
            </div>
        </div>
    );
}
