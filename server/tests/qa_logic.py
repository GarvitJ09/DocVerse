from app.services.qa_logic import answer_question

def test_answer_question():
    question = "What is the capital of France?"
    context = "The capital of France is Paris."
    answer = answer_question(question, context)
    assert "Paris" in answer
