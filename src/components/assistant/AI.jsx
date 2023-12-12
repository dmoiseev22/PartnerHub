import React from "react";
import { supabase, chatInitialSettings } from '../authentication/config.js'
import BeatLoader from 'react-spinners/BeatLoader'
import OpenAI from 'openai';
import { APIContext } from "../../App" 
import { convertLinksToAnchors } from "../../util/util.jsx"

import ChatButton from "./ChatButton.jsx";


export default function AI () {

    const API_KEY = React.useContext(APIContext)

    const welcomeMessage = `
        Hi there! I am a Solga AI Assistant. You can ask me anything you want about Diamond Tools and I'll be happy to assist! I know about 115-400 diamond blades and diamond cups, techcnical characteristics and ready to support you for any related inquery. For prices, please ask your manager. 
    `
    const welcomeQueryHints = (
      <div className="queryHints-container">
        <h4>Ask me anything about Diamond Tools, for example:</h4>
        <ol>
          <div onClick={handleClick}><li >Recommmend 115mm blade to cut tiles with perfect finish</li></div>
          <div onClick={handleClick}><li>В чем разница между 20010200 и 20000200?</li></div>
          <div onClick={handleClick}><li>Quel est le meilleur outil pour poncer le béton sur une meuleuse d'angle de 125 mm?</li></div>
          <div onClick={handleClick}><li>Мi disco corta lento, ¿cuál puede ser el problema?</li></div>
          <div onClick={handleClick}><li>قم بتوفير رابط للحصول على معلومات مفصلة حول شفرة 23117350 SWIFT</li></div>
        </ol>
      </div>
    )

    const [input, setInput] = React.useState('')
    const [chatHistory, setChatHistory] = React.useState(chatInitialSettings)
    const [completion, setCompletion] = React.useState(welcomeMessage)
    const [queryHints, setQueryHints] = React.useState(welcomeQueryHints)
    const [fetchingData, setFetchingData] = React.useState(false)

    const openai = new OpenAI({
      apiKey: API_KEY,
      dangerouslyAllowBrowser: true
    });

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = async function(e) {
        e.preventDefault();
        setFetchingData(true)
        await main(input);
        setInput("")
        setFetchingData(false)
    }

    function handleClick(e) {
      setInput(e.target.innerText)
    }

    async function main(input) {
        try {
          setCompletion("Thinking...")
          const embedding = await createEmbedding(input);
          const match = await findNearestMatch(embedding);
          await getChatCompletion(match, input);
          setQueryHints('')
        } catch (error) {
           console.error('Error in main function.', error.message);
           setCompletion("Sorry, something went wrong. Please try again.")
           setQueryHints(welcomeQueryHints)
        }
      }
    
      async function createEmbedding(input) {
        const embeddingResponse = await openai.embeddings.create({
          model: "text-embedding-ada-002",
          input
        });
        return embeddingResponse.data[0].embedding;
      }
    
      async function findNearestMatch(embedding) {
        const { data } = await supabase.rpc('match_documents', {
          query_embedding: embedding,
          match_threshold: 0.50,
          match_count: 4
        });
        
        // Manage multiple returned matches
        const match = data.map(obj => obj.content).join('\n');
        return match;
      }

      async function getChatCompletion(text, query) {
        setChatHistory((prev) => {
            return [
                ...prev,
                {
                    role: 'user',
                    content: `Context: ${text} Question: ${query}`
                }
            ]
        })
      
        const { choices, usage } = await openai.chat.completions.create({
            // model: 'gpt-4',
            model: 'gpt-3.5-turbo-1106',
            messages: [
                ...chatHistory, 
                {
                role: 'user',
                content: `Context: ${text} Question: ${query}`
                }
            ],
            temperature: 0.2,
            frequency_penalty: 0.5,
        });
        console.log("usage: ", usage)
        setChatHistory((prev) => {
            return [
                ...prev,
                choices[0].message
            ]
        })

      setCompletion(convertLinksToAnchors(choices[0].message.content));
    }

    console.log("chatHistory: ", chatHistory)

    return (
        <div className="assistant-container">

            <h1>AI Assistant</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="How can I help?" 
                    value={input}
                    onChange={handleChange}
                
                />
                
                <button onClick={handleSubmit}>
                    Ask Me
                </button>
            </form>


            {fetchingData 
                ? <BeatLoader className="ai-loader"  loading={fetchingData} color="#C31313" width="160px"/>
                : <>
                    <div className="reply"><b>AI: </b><span className="inline">{completion}</span> </div>
                    <div className="queryhints">{queryHints}</div>
                  </>
                
            }
          <ChatButton />
        </div>
    )
}