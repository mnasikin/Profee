import { execSync } from 'child_process'

async function run() {
    const isServerless = process.env.IS_SERVERLESS === 'true'

    try {
        console.log('🏗️ Running pre-build steps...')

        // Always generate prisma client for types
        console.log('Generating Prisma client...')
        execSync('npx prisma generate', { stdio: 'inherit' })

        if (!isServerless) {
            console.log('📦 Pushing database schema...')
            execSync('npx prisma db push', { stdio: 'inherit' })
        } else {
            console.log('☁️ IS_SERVERLESS is true, skipping prisma db push')
        }

    } catch (error) {
        console.error('❌ Pre-build step failed:', error)
        process.exit(1)
    }
}

run()
