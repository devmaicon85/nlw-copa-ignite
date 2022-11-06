import { Box, FlatList, useToast } from "native-base";
import { useEffect, useState } from "react";
import { api } from "./../services/api";
import { EmptyMyPoolList } from "./EmptyMyPoolList";
import { Game, GameProps } from "./Game";
import { Loading } from "./Loading";

interface Props {
    poolId: string;
    code:string;
}

export function Guesses({ poolId, code }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [firstTeamPoints, setFirstTeamPoints] = useState("");
    const [secondTeamPoints, setSecondTeamPoints] = useState("");

    const [gamesData, setGamesData] = useState<GameProps[]>([]);
    const toast = useToast();

    async function fetchGames() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${poolId}/games`);

            setGamesData(response.data.games);
        } catch (error) {
            toast.show({
                title: "Erro ao carregar os bolões",
                placement: "top",
                bgColor: "red.500",
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGuessConfirm(gameId: string) {
        if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
            return toast.show({
                title: "Informe o placar dos 2 items",
                placement: "top",
                bgColor: "red.500",
            });
        }

        try {
            setIsLoading(true);

            const response = await api.post(
                `/pools/${poolId}/games/${gameId}/guesses`,
                {
                    firstTeamPoints: Number(firstTeamPoints),
                    secondTeamPoints: Number(secondTeamPoints),
                }
            );

            toast.show({
                title: "Palpite realizado com sucesso!",
                placement: "top",
                bgColor: "green.500",
            });

            fetchGames()


        } catch (error) {
            
            toast.show({
                title: "Erro ao carregar os bolões",
                placement: "top",
                bgColor: "red.500",
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchGames();
    }, [poolId]);


    if(isLoading){
        return <Loading/>
    }

    return (
        <FlatList
            data={gamesData}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={()=><EmptyMyPoolList code={code}/>}
            renderItem={({ item }) => (
                <Game
                    data={item}
                    setFirstTeamPoints={setFirstTeamPoints}
                    setSecondTeamPoints={setSecondTeamPoints}
                    onGuessConfirm={()=>handleGuessConfirm(item.id)}
                />
            )}
        ></FlatList>
    );
}
