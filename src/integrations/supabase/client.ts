// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ktojewlkaqfqixazueqw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0b2pld2xrYXFmcWl4YXp1ZXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzYwMDcsImV4cCI6MjA2NTUxMjAwN30.q9uqhRM0lnuh0mVSIvsPYekpZZWEdjRpmc_6un7szpg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);