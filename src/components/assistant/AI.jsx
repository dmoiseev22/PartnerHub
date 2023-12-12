import React from "react";
import { openai, supabase } from '../authentication/config.js'
import BeatLoader from 'react-spinners/BeatLoader'


const chatInitialSettings = [{
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



// HELPER FUNCTION
function convertLinksToAnchors(text) {
  const urlRegex = /(https?:\/\/[^\s]+[^\s.,])/g;

  // Split text into parts and create an array of React components
  const parts = text.split(urlRegex).map((part, index) => {
    if (index % 2 === 1) {
      // If it's a URL, return an anchor component
      return (
        <a key={index} href={part} target="_blank">
          {part}
        </a>
      );
    } else {
      // Otherwise, return the text as is
      return <span key={index}>{part}</span>;
    }
  });

  return <div>{parts}</div>;
}


export default function AI () {

    const welcomeMessage = `
        Hi there! I am a Solga AI Assistant. You can ask me anything you want about Diamond Tools and I'll be happy to assist! I know about 115-400 diamond blades and diamond cups, techcnical characteristics and ready to support you for any related inquery. For prices, please ask your manager. 
    `
    const welcomeQueryHints = (
      <div className="queryHints-container">
        <h4>You can ask me anything but the prices, for example:</h4>
        <ol>
          <div onClick={handleClick}><li >Recommmend 115mm blade to cut tiles with perfect finish</li></div>
          <div onClick={handleClick}><li>What is the difference between 20010200 and 20000200?</li></div>
          <div onClick={handleClick}><li>What is the best tool for grinding concrete on angle grinder 125mm?</li></div>
          <div onClick={handleClick}><li>Suggest the blade with smallest width to cut porcelain in diameter 115mm</li></div>
          <div onClick={handleClick}><li>Provide link for detailed information about 23117350 SWIFT blade</li></div>
        </ol>
      </div>
    )

    const [input, setInput] = React.useState('')
    const [chatHistory, setChatHistory] = React.useState(chatInitialSettings)
    const [completion, setCompletion] = React.useState(welcomeMessage)
    const [queryHints, setQueryHints] = React.useState(welcomeQueryHints)
    const [fetchingData, setFetchingData] = React.useState(false)

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
            temperature: 0.65,
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



    return (
        <div className="assistant-container">

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

            {fetchingData ? 
                <BeatLoader className="ai-loader"  loading={fetchingData} color="#C31313" width="160px"/> : 
                <>
                <div className="reply"><b>AI: </b><span className="inline">{completion}</span> </div>
                <div className="queryhints">{queryHints}</div>
                </>
            }

        </div>
    )
}