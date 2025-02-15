from openai import  OpenAI
from groq import Groq
from dotenv import load_dotenv
import os
load_dotenv()
GROQ_API_KEY = os.getenv('GROQ_API_KEY')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
DEEPSEEK_API_KEY = os.getenv('DEEPSEEK_API_KEY')



client = Groq( 
    api_key=GROQ_API_KEY,
)

def answer_question(question, context):
    prompt = f"Context: {context}\n\nQuestion: {question}\n\nAnswer:"
    response =  client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content":prompt
        }],
    model="llama-3.3-70b-versatile",
)
    return response.choices[0].message.content

# client = OpenAI(
#   api_key=OPENAI_API_KEY)

# def answer_question(question, context):
#     prompt = f"Context: {context}\n\nQuestion: {question}\n\nAnswer:"
#     response =  client.chat.completions.create(
#         model="gpt-3.5-turbo-instruct-0914",
#         messages=[{"role": "user", "content": prompt}]
#     )
#     return response["choices"][0]["message"]["content"]

# client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url="https://api.deepseek.com")

# def answer_question(question, context):
#     prompt = f"Context: {context}\n\nQuestion: {question}\n\nAnswer:"
#     response = client.chat.completions.create(
#     model="deepseek-chat",
#     messages=[
#         {"role": "user", "content":prompt}],
#     stream=False
# )
#     return response.choices[0].message.content