import streamlit as st
import base64
from PIL import Image
import io
import openai

# ✅ API 키 입력창
st.sidebar.title("🔐 OpenAI API Key")
api_key = st.sidebar.text_input("Enter your OpenAI API key:", type="password")

# ✅ API 설정
if not api_key:
    st.warning("Please enter your OpenAI API key.")
    st.stop()

client = openai.OpenAI(api_key=api_key)  # 새로운 방식

# ✅ 이미지 → base64 인코딩 함수
def encode_image_to_base64(image):
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()

# ✅ Vision API 호출
def extract_text_with_openai(image):
    base64_image = encode_image_to_base64(image)

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": "이 이미지에 포함된 텍스트를 가능한 정확하게 인식해줘. 줄바꿈도 포함해서 출력해줘."},
                    {"type": "image_url", "image_url": {
                        "url": f"data:image/png;base64,{base64_image}"
                    }}
                ]
            }
        ],
        max_tokens=1000
    )

    return response.choices[0].message.content.strip()

# ✅ Streamlit 앱 본문
st.title("🧠 OpenAI Vision 기반 이미지 텍스트 추출기")

uploaded_image = st.file_uploader("이미지를 업로드하세요 (jpg, jpeg, png)", type=["jpg", "jpeg", "png"])

if uploaded_image:
    image = Image.open(uploaded_image)
    st.image(image, caption="업로드한 이미지", use_container_width=True)

    with st.spinner("GPT-4o로 텍스트 인식 중..."):
        try:
            extracted_text = extract_text_with_openai(image)
            st.success("✅ 텍스트 인식 완료")
            st.subheader("📄 인식된 텍스트")
            st.text_area(label="", value=extracted_text, height=300)
        except Exception as e:
            st.error(f"❌ 오류 발생:\n\n{e}")
