export default (...messages) => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log('PV+', ...messages);
};
