import { Heading, Toast, useToast, VStack } from "native-base";
import { Header } from "../components/Header";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { api } from "../services/api";
import { useNavigation } from "@react-navigation/native";

export function Find() {
    const [isLoading, setIsLoading] = useState(false);
    const [dataPools, setDataPools] = useState([]);
    const [code, setCode] = useState("");

    const toast = useToast();
    const { navigate } = useNavigation();

    async function handleJoinPool() {
        if (!code.trim()) {
            toast.show({
                title: "Informe o código do bolão",
                placement: "top",
                bgColor: "red.500",
            });
        }

        try {
            setIsLoading(true);

            const response = await api.post("/pools/join", { code });

            toast.show({
                title: "Você entrou no bolão com sucesso!",
                placement: "top",
                bgColor: "green.500",
            });

            navigate("pools");

        } catch (error) {
            setIsLoading(false);
            const message = error.response?.data?.message
                ? error.response?.data?.message
                : "Erro ao procurar o bolão";

            toast.show({
                title: message,
                placement: "top",
                bgColor: "red.500",
            });
            console.log(error);
        }
    }
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">
                <Heading
                    fontFamily="heading"
                    color="white"
                    fontSize="xl"
                    mb={8}
                    textAlign="center"
                >
                    Encontrar um bolão através de {"\n"} seu código único
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual o código do bolão?"
                    onChangeText={setCode}
                    value={code}
                    autoCapitalize="characters"
                />
                <Button
                    title="BUSCAR BOLÃO"
                    onPress={handleJoinPool}
                    isLoading={isLoading}
                />
            </VStack>
        </VStack>
    );
}
