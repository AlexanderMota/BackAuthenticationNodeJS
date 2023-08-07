
module.exports = (allowdExtenctions = [],ext = "") =>{
  if(allowdExtenctions.includes(ext)){
    return true
  } 
  return false;
};