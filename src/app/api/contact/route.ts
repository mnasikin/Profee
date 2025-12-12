import { NextRequest, NextResponse } from 'next/server'
import { getConfig } from '@/lib/config'
import prisma from '@/lib/prisma'
import nodemailer from 'nodemailer'
import { getFallbackContactMessages } from '@/lib/fallback-data'
import { getDataWithFallback, executeWriteOperation } from '@/lib/hybrid-db'

const config = getConfig()

const smtpEnabled = Boolean(config.smtpHost && config.smtpUser && config.smtpPassword)

let transporter: nodemailer.Transporter | null = null

const getTransporter = () => {
  if (!smtpEnabled) return null

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword
      }
    })
  }

  return transporter
}

const escapeHtml = (unsafe: string) =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

// GET all contact messages
export async function GET() {
  try {
    const result = await getDataWithFallback(
      async () => {
        const messages = await prisma.contactMessage.findMany({
          orderBy: { createdAt: 'desc' }
        })
        return messages.map(message => ({
          id: message.id,
          name: message.name,
          email: message.email,
          message: message.message,
          isRead: message.isRead,
          createdAt: message.createdAt
        }))
      },
      () => getFallbackContactMessages()
    )

    return NextResponse.json(result.data)
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching contact messages:', error)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST new contact message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await executeWriteOperation(async () => {
      return await prisma.contactMessage.create({
        data: {
          name,
          email,
          message
        }
      })
    })

    if (!result.success) {
      return NextResponse.json({
        error: result.error,
        fallbackMode: true
      }, { status: 503 })
    }

    let emailSent = false

    if (smtpEnabled) {
      try {
        const mailer = getTransporter()

        if (mailer) {
          await mailer.sendMail({
            from: `"${config.portalTitle || 'Portfolio'}" <${config.smtpUser}>`,
            to: config.contactEmailRecipient || config.smtpUser,
            replyTo: email,
            subject: config.contactEmailSubject || `New contact message from ${name}`,
            text: [
              `You have a new message from ${name} (${email}).`,
              '',
              'Message:',
              message
            ].join('\n'),
            html: `
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">${escapeHtml(message)}</p>
            `
          })

          emailSent = true
        }
      } catch (emailError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error sending contact email:', emailError)
        }
      }
    }

    return NextResponse.json({
      success: true,
      id: result.data?.id,
      emailSent
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error creating contact message:', error)
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
