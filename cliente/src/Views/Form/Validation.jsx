const Validation = (data) => {
    let error = {};
    const imageUrlPattern = /^(http(s)?:\/\/)?\S+\.\S+$/;
    if (data.name.length < 3) {
      error.name = "The name should be at least 3 letrs.";
    }
    if (!imageUrlPattern.test(data.image)) {
      error.image = "The URL of this image is not correct.";
    }
  
    if (
        data.minWeight < 1 || data.minHeight < 1) {
        error.minHeight = "It must be more than 1"
        error.minWeight ="It must be more than 1"
      } 
      if(data.maxWeight > 100 || data.maxHeight > 100 ){
        error.maxHeight = "It must be less than 100"
        error.maxWeight = "It must be less than 100"
      }
      if ( data.life_span < 3) {
      error.life_span = "life span must be more than 5";
    }
  
    return error;  
  };
  
  export default Validation;