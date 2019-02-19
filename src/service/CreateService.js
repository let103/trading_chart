const CreateService = (Service, ...param) => {
    const domain = 'http://52.221.217.53';
    return new Service(domain, ...param);
  };
  
  export default CreateService;