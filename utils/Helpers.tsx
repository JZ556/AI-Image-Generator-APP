//Calculate width and height based on aspect ratio
export const calculateDimensions = (aspectRatio: string , baseSize = 512) => {
    const [width, height] = aspectRatio.split('/').map(Number);
    const scaleFactor = baseSize / Math.sqrt(width * height);

    let calculateWidth = Math.round(width * scaleFactor);
    let calculateHeight = Math.round(height * scaleFactor);

    //Ensure dimensions are multiple of 16 (AI model requirment)
    calculateWidth = Math.floor(calculateWidth /16 ) * 16;
    calculateHeight = Math.floor(calculateHeight /16) * 16;

    return {width: calculateWidth, height: calculateHeight};
};