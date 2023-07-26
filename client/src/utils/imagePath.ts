const takeImage = (imgName: string | undefined) => {
  const imgPath = (imgName?.includes('https://')
    ? imgName
    : `${process.env.REACT_APP_API_URL}${process.env.REACT_APP_IMAGES_URL}${imgName}`);
  return imgPath;
};

export default takeImage;
