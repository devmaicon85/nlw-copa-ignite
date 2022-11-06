import { Text, Icon, Center } from "native-base";
import { Fontisto } from "@expo/vector-icons";

import Logo from "../assets/logo.svg";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function SignIn() {
    const { signIn, isUserLoading } = useAuth();

    // console.log("🚀 ~ file: SignIn.tsx ~ line 10 ~ SignIn ~ user", user)

    return (
        <Center flex={1} bgColor={"gray.900"} p={7}>
            <Logo width={212} height={40} />
            <Button
                title="Entrar com o Google"
                type="SECONDARY"
                leftIcon={
                    <Icon
                        as={Fontisto}
                        name="google"
                        color={"white"}
                        size="md"
                    />
                }
                mt={12}
                onPress={signIn}
                isLoading={isUserLoading}
                _loading={{ _spinner: { color: "white" } }}
            ></Button>

            <Text color="white" textAlign="center" mt={4}>
                Não utilizamos nenhuma informação além {"\n"} do seu e-mail para
                criação de sua conta.
            </Text>
        </Center>
    );
}
