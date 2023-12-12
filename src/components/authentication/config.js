import OpenAI from 'openai';
import { createClient } from "@supabase/supabase-js";

/** FireBase config */
const firebaseConfig = {
    apiKey: "AIzaSyBD_OUECP1sYXgzdk1q83HrrXUVq7o0lls",
    authDomain: "solga-partners-home.firebaseapp.com",
    databaseURL: "https://solga-partners-home-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "solga-partners-home",
    storageBucket: "solga-partners-home.appspot.com",
    messagingSenderId: "1037744607558",
    appId: "1:1037744607558:web:ed96850c9ae6e7b6d3d547"
  };

  export default firebaseConfig

/** OpenAI config */
// if (!process.env.OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");
export const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

/** Supabase config */
const privateKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeHFudWx4anBwYWdha3hpZ2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwNzE3NDgsImV4cCI6MjAxNzY0Nzc0OH0.mafvuNw10wN_iuuFS8HYuzN6dn9F_MxVdmhdRB-yG-o';
// if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = 'https://zcxqnulxjppagakxigki.supabase.co';
// if (!url) throw new Error(`Expected env var SUPABASE_URL`);
export const supabase = createClient(url, privateKey);
