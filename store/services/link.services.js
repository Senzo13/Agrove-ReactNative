export const kitObject = {
    "kitName" : "",
    "kitId" : "",
  }
  
  export const generateLink = {
    "kitId" : "",
    "alreadyGenerated" : false,
  }
  
  let irrig = false
  
  export const setKitObject = (kitName, kitId) => {
    kitObject.kitName = kitName;
    kitObject.kitId = kitId;
  }
  
  export const setGenerateLink = (kitId) => {
    generateLink.kitId = kitId;
  }
  
  export const stopGenerateLink = (boolean) => {
    generateLink.alreadyGenerated = boolean;
  }
  
  export const getGenerateLink = () => {
    return generateLink;
  }
  
  export const getKitObject = () => {
    return kitObject;
  }

  export const setIrrig = (isIrrig) => {
    irrig = isIrrig
  }

  export const getIrrig = () => {
    return irrig
  }
  