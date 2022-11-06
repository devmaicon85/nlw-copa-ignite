import Image from "next/image";

import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import usersAvatarExampleImg from "../assets/avatares.png";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";
import { CardCheck } from "../components/CardCheck";

interface HomeProps {
    poolCount: number;
    guessCount: number;
    usersCount: number;
}

export default function Home({ poolCount, guessCount, usersCount }: HomeProps) {
    const [poolTitle, setPoolTitle] = useState("");
    const [messageForm, setMessageForm] = useState("");

    async function createPool(event: FormEvent) {
        event.preventDefault();

        try {
            const response = await api.post("/pools", {
                title: poolTitle,
            });

            const { code } = response.data;

            await navigator.clipboard.writeText(code);
            setPoolTitle("");
            setMessageForm(
                `Bolão criado com sucesso e o código do bolão #${code} copiado para área de transferência`
            );
        } catch (err) {
            console.log(err);
            setMessageForm("Falha ao criar o bolão. Tente novamente");
        }
    }

    return (
        <div className="max-w-[1124px] mx-auto p-10 h-screen ">
            <div className="grid items-center grid-cols-1 md:grid-cols-2 ">
                <main className="flex flex-col justify-center md:justify-start">
                    <div className="flex justify-center md:justify-start">
                        <Image src={logoImg} alt="NLW Copa" />
                    </div>
                    <h1 className="text-2xl font-bold leading-tight text-center text-white sm:text-3xl md:text-left md:text-4xl lg:text-5xl mt-14">
                        Crie seu próprio bolão de copa e compartilhe entre
                        amigos!
                    </h1>
                    <div className="flex items-center gap-2 mt-10 ">
                        <Image src={usersAvatarExampleImg} alt="" />
                        <strong className="text-xl text-gray-100">
                            <span className="text-ignite-500">
                                +{usersCount}
                            </span>{" "}
                            pessoas já estão usando
                        </strong>
                    </div>

                    <form
                        onSubmit={createPool}
                        className="flex flex-col gap-2 mt-10 xs:flex-row"
                    >
                        <input
                            onChange={(e) => setPoolTitle(e.target.value)}
                            value={poolTitle}
                            className="flex-1 px-4 py-4 text-sm text-gray-100 bg-gray-800 border border-gray-600 rounded "
                            type="text"
                            required
                            placeholder="Qual o nome do seu bolão"
                        />
                        <button
                            className="px-4 py-4 text-sm font-bold text-gray-900 uppercase transition-all bg-yellow-500 rounded whitespace-nowrap hover:brightness-90 "
                            type="submit"
                        >
                            Criar meu bolão
                        </button>
                    </form>

                    {messageForm && (
                        <p className="mt-4 text-sm leading-relaxed text-center text-red-500 md:text-left">
                            <div>{messageForm}</div>
                        </p>
                    )}
                    <p className="mt-4 text-sm leading-relaxed text-center text-gray-300 md:text-left">
                        Após criar seu bolão, você receberá um código único que
                        poderá usar para convidar outras pessoas 🚀
                    </p>
                </main>
                <Image
                    src={appPreviewImg}
                    alt="Dois celulares exibindo uma prévia do app"
                    className="p-4"
                />
            </div>

            {/* CHECKS */}
            <div className="flex flex-col justify-between w-full py-5 mt-10 text-gray-100 border-t border-gray-600 md:w-1/2 md:flex-row ">
                <CardCheck
                    title={`+${poolCount}`}
                    description="Bolões criados"
                />

                <div className="hidden w-px border border-gray-600 md:flex h-14"></div>
                <div className="flex w-[90%] mx-auto h-px border border-gray-600 md:hidden"></div>

                <CardCheck
                    title={`+${guessCount}`}
                    description="Palpites enviados"
                />
            </div>
        </div>
    );
}

export const getServerSideProps = async () => {
    const [poolCountResponse, guessesCountResponse, usersCountResponse] =
        await Promise.all([
            api.get("/pools/count"),
            api.get("/guesses/count"),
            api.get("/users/count"),
        ]);

    return {
        props: {
            poolCount: poolCountResponse.data.count,
            guessCount: guessesCountResponse.data.count,
            usersCount: usersCountResponse.data.count,
        },
    };
};
