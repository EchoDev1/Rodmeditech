import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const getDbUrl = () => {
    try {
        const url = process.env.DATABASE_URL;
        if (url && typeof url === 'string' && url !== 'undefined' && url !== 'null' && url.trim() !== '') {
            return url;
        }
    } catch (e) {
        // Ignore
    }
    return 'file:./dev.db';
};

const adapter = new PrismaLibSql({ url: getDbUrl() })

const globalForPrisma = globalThis

// Use a versioned key so that if the schema changes and client is regenerated,
// the stale cached instance is replaced on next dev server restart.
const PRISMA_CACHE_KEY = '__prisma_client_v2__'

export const prisma = globalForPrisma[PRISMA_CACHE_KEY] ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma[PRISMA_CACHE_KEY] = prisma

