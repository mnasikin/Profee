import { execSync } from 'child_process'

async function run() {
    const isServerless = process.env.IS_SERVERLESS === 'true'

    if (isServerless) {
        console.log('☁️ IS_SERVERLESS is true, skipping postbuild database initialization')
        return
    }

    try {
        console.log('🏗️ Running postbuild database initialization...')
        execSync('tsx scripts/init-db.ts', { stdio: 'inherit' })
    } catch (error) {
        console.error('❌ Postbuild step failed:', error)
        process.exit(1)
    }
}

run()
