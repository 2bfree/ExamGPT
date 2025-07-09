import streamlit as st
import openai
import base64
from PIL import Image
import io
import os

# 🔑 API 키 설정 (환경변수 또는 직접 설정)
openai.api_key = os.getenv("OPENAI_API_KEY")

# ✅ 이미지 → base64 인코딩 함수
def encode_image_to_base64(image):
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()

# ✅ OpenAI Vision으로 이미지에서 텍스트 추출
def extract_text_with_openai(image):
    base64_image = encode_image_to_base64(image)

    prompt = "이 이미지에 있는 텍스트를 가능한 정확하게 인식해줘. 줄바꿈 포함해서 출력해줘."

    response = openai.ChatCompletion.create(
        model="gpt-4o",  # 또는 gpt-4-vision-preview
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
        max_tokens=1000
    )

    return response.choices[0].message.content.strip()

# ✅ Streamlit 앱
def main():
    st.title("🧠 OpenAI Vision 기반 이미지 텍스트 추출기")

    uploaded_image = st.file_uploader("이미지를 업로드하세요 (jpg, jpeg, png)", type=["jpg", "jpeg", "png"])

    if uploaded_image:
        image = Image.open(uploaded_image)
        st.image(image, caption="업로드한 이미지", use_container_width=True)

        with st.spinner("텍스트 인식 중..."):
            try:
                extracted_text = extract_text_with_openai(image)
                st.success("텍스트 추출 완료 ✅")
                st.subheader("📄 인식된 텍스트:")
                st.text_area(label="", value=extracted_text, height=300)
            except Exception as e:
                st.error(f"오류 발생: {e}")

if __name__ == "__main__":
    main()
