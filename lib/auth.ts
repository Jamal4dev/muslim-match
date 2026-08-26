import { supabaseAdmin } from './supabase'

export async function getUserFromAuthHeader(authHeader: string | null) {
  if (!authHeader?.startsWith('Bearer ')) return null
  const token = authHeader.replace('Bearer ', '')
  const { data, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !data.user) return null
  return data.user
}
