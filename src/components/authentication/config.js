import { createClient } from "@supabase/supabase-js";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, onValue } from "firebase/database"

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

  // if (!apiKey) throw new Error("OpenAI API key is missing or invalid.");
export 


/** Supabase config */
const privateKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeHFudWx4anBwYWdha3hpZ2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIwNzE3NDgsImV4cCI6MjAxNzY0Nzc0OH0.mafvuNw10wN_iuuFS8HYuzN6dn9F_MxVdmhdRB-yG-o';
// if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = 'https://zcxqnulxjppagakxigki.supabase.co';
// if (!url) throw new Error(`Expected env var SUPABASE_URL`);
export const supabase = createClient(url, privateKey);


// Other Settings 

export const chatInitialSettings = [{
  role: 'system',
  content: `You are Solga AI Assistant. You are an enthusiastic diamond tools expert who loves recommending tools to people. 
  You will be given two pieces of information - some context about diamond tools and a question. 
  Your main job is to formulate a short answer to the question using the provided context. If you are askied to provide additional information on a product, focus on previously provided code.
  If the answer is not given in the context, find the answer in the conversation history if possible. 
  If you are unsure and cannot find the answer, say, "Sorry, I don't know the answer." Do not make up the answer.
  But you can help with technical questions related only to diamond tools even if the data was not provided in context.
  Always speak as if you were chatting to a client, you can joke but be polite. 
  Reply in maximum 60 words. Spesk the same language as user` 
}];