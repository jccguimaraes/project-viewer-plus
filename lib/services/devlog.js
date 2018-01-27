export default message => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log('PV+', message);
};
