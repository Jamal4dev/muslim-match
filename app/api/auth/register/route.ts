import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { registerSchema } from '@/lib/validators'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: parsed.error.issues
            .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
            .join(', '),
        },
        { status: 400 }
      )
    }

    const {
      full_name,
      email,
      password,
      gender,
      date_of_birth,
    } = parsed.data

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name,
          gender,
          date_of_birth,
        },
      })

    if (authError || !authData.user) {
      return NextResponse.json(
        {
          error: authError?.message || 'Registration failed',
        },
        { status: 400 }
      )
    }

    const { error: insertError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        full_name,
        email,
        gender,
        date_of_birth,
        is_verified: false,
        verification_status: 'PENDING',
      })

    if (insertError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id)

      return NextResponse.json(
        {
          error: 'Profile creation failed',
          details: insertError.message,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        message: 'Registered successfully',
        user_id: authData.user.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('REGISTER_ERROR:', error)

    return NextResponse.json(
      {
        error: 'Invalid request body',
      },
      { status: 400 }
    )
  }
}