import axios from "axios";

export const sendPostRequest = async (path: string, sendData: any | null) => {
  const response = await axios.post(path, sendData);
  return response.data;
};

// image file을 포함하는 요청 -> multipart로 구현
export const sendMultipartRequest = async (
  path: string,
  formDatas?: File[]
) => {
  const form = new FormData();

  if (!formDatas) {
    console.log("no ImgFiles!");
    return;
  }

  formDatas.forEach((formData, i) => {
    form.append("image", formData, "image" + i);
  });

  try {
    const response = await axios({
      method: "POST",
      url: `${path}`,
      /* 아래와 같이 헤더 설정하면 boundary가 빠져서 서버가 에러를 뱉어낸다
      headers: {
        "Content-Type": "multipart/form-data",
      },
      */
      data: form,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
