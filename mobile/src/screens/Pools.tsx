import { VStack, Icon, useToast, FlatList } from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Octicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { api } from "./../services/api";
import { useCallback, useEffect } from "react";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { useState } from "react";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Pools() {
    const { navigate } = useNavigation();
    const [dataPools, setDataPools] = useState<PoolCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    async function fetchPools() {
        try {
            setIsLoading(true);
            const response = await api.get("/pools");

            console.log(response.data.pools);
            setDataPools(response.data.pools);
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

    useFocusEffect(
        useCallback(() => {
            fetchPools();
        }, [])
    );

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />
            <VStack
                mt={6}
                mx={5}
                borderBottomWidth={1}
                borderBottomColor="gray.600"
                pb={4}
                mb={4}
            >
                <Button
                    title="BUSCAR BOLÃO POR CÓDIGO"
                    onPress={() => navigate("find")}
                    leftIcon={
                        <Icon
                            as={Octicons}
                            name="search"
                            color="black"
                            size="md"
                        />
                    }
                ></Button>
            </VStack>

            {isLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={dataPools}
                    ListEmptyComponent={<EmptyPoolList />}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PoolCard
                            data={item}
                            onPress={() => navigate("details", { id: item.id })}
                        />
                    )}
                    px={1}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 10 }}
                />
            )}
        </VStack>
    );
}
