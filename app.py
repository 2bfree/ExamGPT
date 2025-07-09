import streamlit as st
import base64
from PIL import Image
import io
import openai
import re

# 🔐 API KEY 입력
st.sidebar.title("🔐 OpenAI API Key")
api_key = st.sidebar.text_input("Enter your OpenAI API key:", type="password")

if not api_key:
    st.warning("Please enter your OpenAI API key to proceed.")
    st.stop()

client = openai.OpenAI(api_key=api_key)

# 📌 Vision API 요청 함수
def extract_text_with_openai(image: Image.Image, prompt: str = "이미지에서 텍스트로 추출해줘"):
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    base64_image = base64.b64encode(buffered.getvalue()).decode()

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {
                        "url": f"data:image/png;base64,{base64_image}"
                    }}
                ]
            }
        ],
        max_tokens=2000
    )
    return response.choices[0].message.content.strip()

# 📌 문항별 자동 분리
def split_questions(text):
    return re.split(r'\n*\d+\.', text)

# 📌 채점 (정답 기준)
answer_key = {
    1: "파리는 프랑스의 수도이다.",
    2: "물은 섭씨 100도에서 끓는다.",
    3: "지구는 태양 주위를 돈다."
}

def grade_answer(student_answer, reference_answer):
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "당신은 학생의 주관식 답안을 10점 만점 기준으로 채점하는 평가자입니다."},
            {"role": "user", "content": f"학생의 답안: {student_answer}\n정답: {reference_answer}\n점수(10점 만점)와 간단한 평가를 해줘."}
        ],
        max_tokens=500
    )
    return completion.choices[0].message.content.strip()

# 🖼️ 이미지 업로드
st.title("📄 OpenAI Vision 기반 자동 채점기")
uploaded_image = st.file_uploader("시험지 이미지를 업로드하세요", type=["jpg", "jpeg", "png"])

if uploaded_image:
    image = Image.open(uploaded_image)
    st.image(image, caption="업로드한 시험지", use_container_width=True)

    with st.spinner("GPT-4o로 이미지 분석 중..."):
        try:
            extracted_text = extract_text_with_openai(image)
            st.success("✅ 텍스트 추출 완료")

            st.subheader("📄 추출된 텍스트")
            st.text_area("Extracted Text", extracted_text, height=200)

            st.subheader("📌 문항별 자동 채점")
            questions = split_questions(extracted_text)
            total_score = 0
            max_score = 0

            for idx, ans in enumerate(questions[1:], 1):  # 첫번째는 빈값일 수 있음
                if idx in answer_key:
                    st.markdown(f"### ❓ 문항 {idx}")
                    st.write(f"✍️ 학생 답변: {ans.strip()}")
                    grading_result = grade_answer(ans.strip(), answer_key[idx])
                    st.write(f"📊 채점 결과:\n{grading_result}")

                    # 점수 추출
                    score_match = re.search(r'(\d{1,2})점', grading_result)
                    if score_match:
                        score = int(score_match.group(1))
                        total_score += score
                        max_score += 10
                    else:
                        max_score += 10

            st.markdown("---")
            st.subheader(f"🧾 총점: {total_score} / {max_score}")
        except Exception as e:
            st.error(f"❌ 오류 발생:\n\n{e}")
