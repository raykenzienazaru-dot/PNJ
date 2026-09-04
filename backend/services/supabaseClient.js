const { createClient } = require("@supabase/supabase-js");

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "[supabaseClient] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY is not set. " +
      "Fill in the .env file first (see .env.example)."
  );
}

// The backend uses the service_role key because it acts as a trusted server
// that runs validation & business logic before touching the database
// (not an arbitrary RLS bypass).
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { autoRefreshToken: false, persistSession: false },
  }
);

module.exports = { supabaseAdmin };
