import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mkojcietzlacpulogtfe.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rb2pjaWV0emxhY3B1bG9ndGZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxMjI2MjAsImV4cCI6MjA4MDY5ODYyMH0.8fIDecpQ30iC75XuzaKnpXKFeKJ5bIqGJxZXpx-pEHU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
