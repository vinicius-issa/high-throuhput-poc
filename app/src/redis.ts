import { RedisClientType, createClient } from "redis";

export class RedisConnection {
  private static redis: any

  public static async getClient(): Promise<RedisClientType> {
    if (!this.redis) {
      const url = process.env.REDIS_URL ?? "";
      this.redis = await createClient({ url })
        .on('error', (e) => console.error(e))
        .connect();
    }

    return this.redis as RedisClientType;;
  }
}
