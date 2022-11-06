import React, { useCallback, useEffect, useState } from "react";
import { HStack, useToast, VStack } from "native-base";
import { Text } from "native-base";
import { Header } from "./../components/Header";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { api } from "./../services/api";
import { Loading } from "../components/Loading";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "./../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Share } from "react-native";
import { Guesses } from "../components/Guesses";

interface RouteParams {
    id: string;
}
export function Details() {
    const route = useRoute();

    const [isLoading, setIsLoading] = useState(false);

    const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">(
        "guesses"
    );

    const [poolDetails, setPoolDetails] = useState<PoolCardProps>(
        {} as PoolCardProps
    );

    const toast = useToast();

    const { id } = route.params as RouteParams;

    async function handleCodeShare() {
        await Share.share({
            message: poolDetails.code,
        });
    }

    async function fetchPoolDetails() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${id}`);

            setPoolDetails(response.data.pool);
        } catch (error) {
            setIsLoading(false);
            const message = error.response?.data?.message
                ? error.response?.data?.message
                : "Erro ao buscar o bolão";

            toast.show({
                title: message,
                placement: "top",
                bgColor: "red.500",
            });
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPoolDetails();
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header
                title={poolDetails.title}
                showBackButton
                showShareButton
                onShare={handleCodeShare}
            />

            {poolDetails._count?.participants > 0 ? (
                <VStack px={5} flex={1}>
                    <PoolHeader data={poolDetails} />

                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option
                            title="Seus Palpites"
                            isSelected={optionSelected === "guesses"}
                            onPress={() => setOptionSelected("guesses")}
                        />
                        <Option
                            title="Ranking do Grupo"
                            isSelected={optionSelected === "ranking"}
                            onPress={() => setOptionSelected("ranking")}
                        />
                    </HStack>

                    <Guesses poolId={poolDetails.id} code={poolDetails.code}/>
                </VStack>
            ) : (
                <EmptyMyPoolList code={poolDetails.code} />
            )}
        </VStack>
    );
}
