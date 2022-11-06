import Fastify from "fastify";
import cors from "@fastify/cors";
import { poolRoutes } from "./routes/pool";
import { guessesRoutes } from "./routes/guess";
import { gameRoutes } from "./routes/game";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/user";

import JWT from "@fastify/jwt";

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true,
    });

    await fastify.register(JWT, {
        secret: "nlwcopa12345",
    });

    await fastify.register(authRoutes);
    await fastify.register(gameRoutes);
    await fastify.register(guessesRoutes);
    await fastify.register(poolRoutes);
    await fastify.register(userRoutes);

    await fastify.listen({ port: 3030, host: "0.0.0.0" });
}

bootstrap();
