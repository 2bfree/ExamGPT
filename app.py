import streamlit as st
from paddleocr import PaddleOCR
from PIL import Image
import numpy as np
import openai
import io

# ✅ PaddleOCR 초기화
ocr = PaddleOCR(use_angle_cls=True, lang='en')

# ✅ OpenAI API 키 입력
st.sidebar.title("🔐 OpenAI API Key")
api_key = st.sidebar.text_input("Enter your OpenAI API key:", type="password")
if not api_key:
    st.warning("OpenAI API 키를 입력해주세요.")
    st.stop()
openai.api_key = api_key

# ✅ 텍스트 추출 함수 (PaddleOCR)
def extract_text_with_paddleocr(image):
    image_np = np.array(image.convert("RGB"))  # PIL → np.array
    result = ocr.ocr(image_np, cls=True)
    extracted_text = ""
    for line in result[0]:
        extracted_text += line[1][0] + "\n"
    return extracted_text.strip()

# ✅ GPT 평가 요청
def evaluate_answer(text):
    prompt = f"""다음은 학생이 쓴 답변이다. 글을 문법적, 표현적, 내용적 측면에서 5점 만점 기준으로 평가해줘.
또한 좋았던 점과 개선할 점을 함께 써줘.

학생 답변:
{text}
"""
    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": prompt}
        ],
        max_tokens=1024
    )
    return response.choices[0].message.content.strip()

# ✅ Streamlit UI
st.title("📝 손글씨 답변 인식 및 평가 (PaddleOCR + GPT-4o)")

uploaded_image = st.file_uploader("이미지 파일을 업로드하세요 (jpg/png/jpeg)", type=["jpg", "jpeg", "png"])
if uploaded_image:
    image = Image.open(uploaded_image)
    st.image(image, caption="업로드한 이미지", use_container_width=True)

    with st.spinner("📖 텍스트 추출 중..."):
        extracted_text = extract_text_with_paddleocr(image)
        st.success("✅ 텍스트 추출 완료")

    st.subheader("✂️ 인식된 텍스트")
    st.text_area("텍스트 결과", value=extracted_text, height=200)

    if st.button("✍️ GPT로 평가하기"):
        with st.spinner("GPT-4o로 평가 중..."):
            try:
                feedback = evaluate_answer(extracted_text)
                st.success("✅ 평가 완료")
                st.subheader("📊 GPT 평가 결과")
                st.text_area("", feedback, height=300)
            except Exception as e:
                st.error(f"❌ GPT 평가 중 오류 발생: {e}")
